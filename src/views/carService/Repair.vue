<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb separator="/" style="padding-left: 10px;padding-bottom: 10px;font-size: 13px">
            <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>业务管理</el-breadcrumb-item>
            <el-breadcrumb-item>车辆服务管理</el-breadcrumb-item>
            <el-breadcrumb-item>维修管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!--用户列表卡片-->
        <el-card class="box-card">
            <el-form :inline="true" :model="searchInCondition" class="demo-form-inline">
                <el-form-item label="订单编号">
                    <el-input clearable v-model="searchInCondition.orderId" placeholder="请输入订单编号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" @click="onSubmit">查询</el-button>
                </el-form-item>
                <div style="margin-left: 68px;margin-bottom: 20px">
                    <el-button icon="el-icon-bell" type="danger" @click="todo">待处理</el-button>
                    <el-button icon="el-icon-tickets" type="primary" @click="allList">维修记录</el-button>
                </div>
            </el-form>
            <!--表格显示-->

            <el-table
                    :data="repairList"
                    style="width: 100%;height:100%">
                <el-table-column prop="orderId" label="订单编号"></el-table-column>
                <el-table-column  label="车辆编号" align="center">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p>维修部位: {{ scope.row.repairPart }}</p>
                            <p>受损情况: {{ scope.row.repairDetail }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="large">{{ scope.row.carId }}</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="repairIf" label="是否受损" align="center"  :formatter="showRepair"></el-table-column>
                <el-table-column prop="repairCost" label="维修费用" align="center"></el-table-column>
                <el-table-column prop="repairCreate" label="创建时间"></el-table-column>
                <el-table-column prop="repairRecorder" label="登记人员"></el-table-column>
                <el-table-column label="操作" >
                    <template slot-scope="scope">
                        <el-button size="small" type="danger"  @click="record(scope.row.repairId,scope.row.orderId,scope.row.carId)">登记</el-button>
                    </template>
                </el-table-column>

            </el-table>

            <!--维修登记对话框-->
            <el-dialog  title="维修记录" :visible.sync="dialogFormVisible" width="35%"  :before-close="handleClose" >
                <el-form :model="repairForm"
                         ref="repairForm"
                         label-width="80px"

                         class="demo-form-inline"
                         :rules=null
                >
                    <el-form-item label="订单编号" prop="orderId" >
                        <el-input v-model="repairForm.orderId" disabled="true" style="width: 300px;"></el-input>
                    </el-form-item>
                    <el-form-item label="汽车编号" prop="carId">
                        <el-input v-model="repairForm.carId" disabled="true" style="width: 300px;"></el-input>
                    </el-form-item>
                    <el-form-item label="是否受损" prop="repairIf" >
                        <div  style="width: 207px">
                            <el-radio v-model="repairForm.repairIf" label="1">是</el-radio>
                            <el-radio v-model="repairForm.repairIf" label="0" style="padding-left: 28px">否</el-radio>
                        </div>
                    </el-form-item>
                    <el-form-item label="维修部位" prop="repairPart" v-if="repairForm.repairIf==1">
                        <el-input v-model="repairForm.repairPart" style="width: 300px;"></el-input>
                    </el-form-item>
                    <el-form-item label="受损情况" prop="repairDetail" v-if="repairForm.repairIf==1">
                        <el-input
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 4}"
                                placeholder="请输入内容"
                                v-model="repairForm.repairDetail"
                                style="width: 300px"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item label="维修费用" prop="repairCost" v-if="repairForm.repairIf==1">
                        <el-input v-model="repairForm.repairCost" style="width: 300px;"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" style="text-align: center">
                    <el-button @click="submitForm()">提 交</el-button>
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
                    repairId: '',
                    orderId:'',
                    carId: '',
                    repairRecorder:''
                },
                dialogFormVisible:false,
                repairList:[],
                /*分页参数*/
                currentPage: 1,
                total: 0,
                pageSize: 5,
                repairForm:{
                    repairId:'',
                    orderId:'',
                    carId:'',
                    repairIf:'',
                    repairPart:'',
                    repairDetail:'',
                    repairCost:'',
                    repairCreate:'',
                    repairRecorder:''
                }

            }
        },
        methods: {
            handleClose(done) {
                done();
                this.$refs.repairForm.resetFields();
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize=val;
                this.page(this.currentPage);
            },
            showRepair(row) {
                return row.repairIf == 1 ? "是" : "否";
            },
            onSubmit() {
                console.log('submit!');
                this.page(this.currentPage);
            },
            page(currentPage) {
                const _this = this
                _this.$axios.post("/repair/list?currentPage=" + currentPage + "&pageSize=" + this.pageSize, this.searchInCondition).then(res => {
                    _this.repairList = res.data.data.records
                    _this.currentPage = res.data.data.current
                    _this.total = res.data.data.total
                    _this.pageSize = res.data.data.size
                })
            },
            record(id,order,car){
                this.dialogFormVisible = true;
                this.repairForm.repairId = id
                this.repairForm.orderId = order
                this.repairForm.carId = car
            },
            submitForm() {
                if (this.$store.getters.getUser.name) {
                    this.repairForm.repairRecorder = this.$store.getters.getUser.name
                }
                const _this = this;
                this.$axios.post('/repair/edit', this.repairForm, {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                }).then((res) => {
                    _this.reload()
                    this.$notify({
                        title: res.data.data,
                        type: 'success',
                        duration: 2 * 1000
                    });
                });
            },
            todo(){

            },
            allList(){

            }
        },
        created() {
            this.page(1)
        }
    }
</script>

<style scoped>

</style>