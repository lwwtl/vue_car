<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb separator="/" style="padding-left: 10px;padding-bottom: 10px;font-size: 13px">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>业务管理</el-breadcrumb-item>
            <el-breadcrumb-item>车辆服务管理</el-breadcrumb-item>
            <el-breadcrumb-item>违章管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!--用户列表卡片-->
        <el-card class="box-card">
            <el-form :inline="true" :model="searchInCondition" class="demo-form-inline">
                <el-form-item label="订单编号">
                    <el-input clearable v-model="searchInCondition.orderId" placeholder="请输入订单编号"></el-input>
                </el-form-item>
                <el-form-item label="车牌号">
                    <el-input clearable v-model="searchInCondition.carNo" placeholder="请输入车牌号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" @click="onSubmit">查询</el-button>
                </el-form-item>
                <div style="margin-left: 68px;margin-bottom: 20px">
                    <el-button icon="el-icon-bell" :type="todoActive" @click="todo">待处理</el-button>
                    <el-button icon="el-icon-tickets" :type="recordActive" @click="allList">违章记录</el-button>
                </div>
            </el-form>
            <!--表格显示-->

            <el-table
                    :data="violationsList"
                    empty-text="暂无待处理订单"
                    style="width: 100%;height:100%">
                <el-table-column prop="orderId" label="订单编号"></el-table-column>
                <el-table-column prop="carNo" label="车牌号" align="center"></el-table-column>
                <el-table-column  label="是否违章" align="center" >
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="left">
                            <p v-if="scope.row.violationsIf == 1">违章时间: {{ scope.row.violationsTime }}</p>
                            <p v-if="scope.row.violationsIf == 1">违章地点: {{ scope.row.violationsSite }}</p>
                            <p v-if="scope.row.violationsIf == 0">无违章</p>
                            <div slot="reference" class="name-wrapper" >
                                <el-tag size="large" v-if="scope.row.violationsIf == 1">是</el-tag>
                                <el-tag size="large" v-if="scope.row.violationsIf == 0">否</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="violationsCost" label="处罚金额" align="center"></el-table-column>
                <el-table-column prop="violationsCreate" label="创建时间"></el-table-column>
                <el-table-column prop="violationsRecorder" label="登记人员"></el-table-column>
                <el-table-column label="操作" >
                    <template slot-scope="scope">
                        <el-button size="small" type="danger" v-if="scope.row.violationsRecorder==null"
                                   @click="record(scope.row.violationsId,scope.row.orderId,scope.row.carId,scope.row.userId)">登记</el-button>
                        <el-button size="small" type="primary"  v-if="scope.row.violationsRecorder!=null"
                                   @click="find(scope.row.orderId)">查看</el-button>
                    </template>
                </el-table-column>

            </el-table>

            <!--维修登记对话框-->
            <el-dialog  title="维修记录" :visible.sync="dialogFormVisible" width="35%"  :before-close="handleClose" >
                <el-form :model="violationsForm"
                         ref="repairForm"
                         label-width="80px"
                         :disabled="findFlag"
                         class="demo-form-inline"
                         :rules=null
                >
                    <el-form-item label="订单编号" prop="orderId" >
                        <el-input v-model="violationsForm.orderId" disabled="true" style="width: 300px;"></el-input>
                    </el-form-item>
                    <el-form-item label="汽车编号" prop="carId">
                        <el-input v-model="violationsForm.carId" disabled="true" style="width: 300px;"></el-input>
                    </el-form-item>
                    <el-form-item label="用户编号" prop="carId">
                        <el-input v-model="violationsForm.userId" disabled="true" style="width: 300px;"></el-input>
                    </el-form-item>
                    <el-form-item label="是否违章" prop="violationsIf" >
                        <div  style="width: 207px">
                            <el-radio v-model="violationsForm.violationsIf" label="1">是</el-radio>
                            <el-radio v-model="violationsForm.violationsIf" label="0" style="padding-left: 28px">否</el-radio>
                        </div>
                    </el-form-item>
                    <el-form-item label="违章时间"  v-if="violationsForm.violationsIf==1">
                        <el-date-picker
                                v-model="violationsForm.violationsTime"
                                type="datetime"
                                placeholder="选择日期时间"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                style="width: 300px"
                                default-time="12:00:00"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="违章地点" prop="violationsSite" v-if="violationsForm.violationsIf==1">
                        <el-input v-model="violationsForm.violationsSite" style="width: 300px;"></el-input>
                    </el-form-item>
                    <el-form-item label="违章详情" prop="violationsDetail" v-if="violationsForm.violationsIf==1">
                        <el-input
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 4}"
                                placeholder="请输入内容"
                                v-model="violationsForm.violationsDetail"
                                style="width: 300px"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item label="处罚金额" prop="violationsCost" v-if="violationsForm.violationsIf==1">
                        <el-input v-model="violationsForm.violationsCost" style="width: 300px;"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" style="text-align: center">
                    <el-button v-if="!findFlag"  @click="submitForm()">提 交</el-button>

                </div>
            </el-dialog>
            <!--分页区域-->
            <el-pagination
                    style="padding-top: 20px"
                    @size-change="handleSizeChange"
                    @current-change="page"
                    :current-page=currentPage
                    :page-size=pageSize
                    :page-sizes="[5, 10, 15, 20]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
    export default {
        inject:['reload'],
        name: "Repair",
        data() {
            return {
                searchInCondition: {
                    orderId:'',
                    carNo: '',
                    violationsRecorder:''
                },
                dialogFormVisible:false,
                violationsList:[],
                /*分页参数*/
                pageNum:1,
                currentPage: 1,
                total: 0,
                pageSize: 5,
                violationsForm:{
                    violationsId:'',
                    userId:'',
                    orderId:'',
                    carId:'',
                    violationsIf:'',
                    violationsTime:'',
                    violationsSite:'',
                    violationsDetail:'',
                    violationsCost:'',
                    violationsCreate:'',
                    violationsRecorder:''
                },
                todoActive:'danger',
                recordActive:'',
                findFlag:false

            }
        },
        methods: {
            handleClose(done) {
                done();
                this.$refs.violationsForm.resetFields();
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize=val;
                this.page(this.currentPage);
            },
            onSubmit() {
                console.log('submit!');
                this.page(this.currentPage);
            },
            page(currentPage) {
                const _this = this
                _this.$axios.post("/violations/list?currentPage=" + currentPage + "&pageSize=" + this.pageSize, this.searchInCondition).then(res => {
                    _this.violationsList = res.data.data.list
                    _this.currentPage = res.data.data.pageNum
                    _this.total = res.data.data.total
                    _this.pageSize = res.data.data.pageSize
                })
            },
            record(id,order,car,user){
                this.findFlag = false
                this.dialogFormVisible = true;
                this.violationsForm.violationsId = id
                this.violationsForm.orderId = order
                this.violationsForm.carId = car
                this.violationsForm.userId = user
            },
            find(id){
                this.findFlag = true
                const _this = this
                this.dialogFormVisible = true
                this.$axios.get('/violations/find/' + id).then((res) => {
                    const emp = res.data.data
                    _this.violationsForm = emp
                });
            },
            submitForm() {
                if (this.$store.getters.getUser.name) {
                    this.violationsForm.violationsRecorder = this.$store.getters.getUser.name
                }
                const _this = this;
                this.$axios.post('/violations/edit', this.violationsForm, {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                }).then((res) => {
                    _this.reload()
                    this.$notify({
                        title: "操作成功",
                        type: 'success',
                        duration: 2 * 1000
                    });
                });
            },
            todo(){
                this.recordActive = ''
                this.todoActive = 'danger'
                this.searchInCondition.violationsRecorder = ''
                this.page(this.currentPage);
            },
            allList(){
                this.todoActive = ''
                this.recordActive = 'primary'
                this.searchInCondition.violationsRecorder = '有'
                this.page(this.currentPage);
            }
        },
        created() {
            this.page(1)
        }
    }
</script>

<style scoped>

</style>