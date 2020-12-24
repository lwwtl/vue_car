<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb separator="/" style="padding-left: 10px;padding-bottom: 10px;font-size: 13px">
            <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>车辆管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!--用户列表卡片-->
        <el-card class="box-card">
            <el-form :inline="true" :model="searchInCondition" class="demo-form-inline">
                <el-form-item label="车牌号">
                    <el-input clearable v-model="searchInCondition.no" placeholder="请输入车牌号"></el-input>
                </el-form-item>
                <el-form-item label="车名">
                    <el-input clearable v-model="searchInCondition.name" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" @click="onSubmit">查询</el-button>
                </el-form-item>
                <el-button type="primary" icon="el-icon-plus"  @click="dialogFormVisible=true">添加车辆</el-button>
            </el-form>
            <!--添加对话框-->
            <el-dialog  title="添加车辆" :visible.sync="dialogFormVisible" width="50%"  :before-close="handleClose" >
                <el-form :model="editForm"
                         ref="editForm"
                         label-width="80px"
                         :inline="true"
                         class="demo-form-inline"
                         :rules=null
                >
                    <!--form-item需要添加prop属性，对应Model,否则清除表单无效-->
                    <el-form-item label="车牌号" prop="no">
                        <el-input v-model="editForm.no"  style="width: 150px"></el-input>
                    </el-form-item>
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="editForm.name" style="width: 150px" ></el-input>
                    </el-form-item>
                    <el-form-item label="颜色" prop="color">
                        <el-input v-model="editForm.color" style="width: 150px"></el-input>
                    </el-form-item>
                    <el-form-item label="价格" prop="price">
                        <el-input v-model="editForm.price" style="width: 150px" placeholder="单位：万元"></el-input>
                    </el-form-item>
                    <el-form-item label="租金" prop="rent">
                        <el-input v-model="editForm.rent" style="width: 150px" placeholder="单位：元"></el-input>
                    </el-form-item>
                    <el-form-item label="排量" prop="output">
                        <el-input v-model="editForm.output" style="width: 150px"></el-input>
                    </el-form-item>
                    <el-form-item label="车厢" prop="box">
                        <el-input v-model="editForm.box" style="width: 150px"></el-input>
                    </el-form-item>
                    <el-form-item label="座位" prop="seat">
                        <el-input v-model="editForm.seat" style="width: 150px"></el-input>
                    </el-form-item>
                    <el-form-item label="类型" prop="type">
                        <el-select
                                v-model="value"
                                multiple
                                filterable
                                allow-create
                                default-first-option
                                placeholder="请选择车辆类型"
                                style="width: 390px"
                        >
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="变速" prop="model">
                        <div style="width: 178px">
                            <el-radio v-model="editForm.model" label="手排">手排</el-radio>
                            <el-radio v-model="editForm.model" label="自排">自排</el-radio>
                        </div>
                    </el-form-item>
                    <el-form-item label="车辆状态" prop="state">
                        <div style="width: 180px">
                            <el-radio v-model="editForm.state" label="已出库">已出库</el-radio>
                            <el-radio v-model="editForm.state" label="已入库">已入库</el-radio>
                        </div>
                    </el-form-item>
                    <el-form-item label="所属门店" prop="store">
                        <el-input v-model="editForm.store" style="width: 390px"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" style="text-align: center">
                    <el-button @click="callOf()">取 消</el-button>
                    <el-button type="primary" @click="submitForm()">确 定</el-button>
                </div>
            </el-dialog>
            <!--表格显示-->
            <el-table
                    :data="carList"
                    style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="类 型">
                                <span>{{ props.row.type }}</span>
                            </el-form-item>
                            <el-form-item label="颜 色">
                                <span>{{ props.row.color }}</span>
                            </el-form-item>
                            <el-form-item label="价 格">
                                <span>{{ props.row.price }} 万元</span>
                            </el-form-item>
                            <el-form-item label="租 金">
                                <span>{{ props.row.rent }} 元/日</span>
                            </el-form-item>
                            <el-form-item label="变 速">
                                <span>{{ props.row.model }}</span>
                            </el-form-item>
                            <el-form-item label="排 量">
                                <span>{{ props.row.output }} L</span>
                            </el-form-item>
                            <el-form-item label="车 厢">
                                <span>{{ props.row.box }} 厢</span>
                            </el-form-item>
                            <el-form-item label="座 位">
                                <span>{{ props.row.seat }} 座</span>
                            </el-form-item>
                            <el-form-item label="所属门店">
                                <span>{{ props.row.store }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="车牌号" prop="no">
                </el-table-column>
                <el-table-column label="车辆名称" prop="name">
                </el-table-column>
                <el-table-column label="车辆图片" prop="">
                    <template width="200" slot-scope="scope">
                        <img style="width:200px;border:none;" :src="scope.row.img">
                    </template>
                </el-table-column>
                <el-table-column label="车辆状态" prop="state">
                </el-table-column>
                <el-table-column label="操作" >
                    <template slot-scope="scope">
                        <el-button size="small" type="primary" icon="el-icon-edit-outline" @click="find(scope.row.id)"></el-button>
                        <el-button type="danger" size="small" icon="el-icon-delete" @click="del(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
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
        name: "Car",
        data() {
            return {
                options: [{
                    value: 'HTML',
                    label: 'HTML'
                }, {
                    value: 'CSS',
                    label: 'CSS'
                }, {
                    value: 'JavaScript',
                    label: 'JavaScript'
                }],
                value:[],
                searchInCondition: {
                    no: '',
                    name:''
                },
                /*分页参数*/
                currentPage: 1,
                total: 0,
                pageSize: 5,
                /*表格*/
                carList: [],
                /*添加对话框*/
                dialogFormVisible: false,
                editForm: {
                    id: '',
                    no: '',
                    name: '',
                    model: '',
                    type: '',
                    box: '',
                    output: '',
                    seat: '',
                    color: '',
                    price: '',
                    rent: '',
                    img:'',
                    state: '',
                    store: ''
                },
                // editFormRules: {
                //     account: [
                //         { required: true, message: "不能为空", trigger: "blur" },
                //         { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
                //     ],
                //     password: [
                //         { required: true, message: "不能为空", trigger: "blur" },
                //         { min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'blur' }
                //     ],
                //     name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
                //     gender: [{ required: true, message: "性别不能为空", trigger: "blur" }],
                //     age: [{ required: true, message: "年龄不能为空", trigger: "blur" }],
                //     mobile: [
                //         { required: true, message: "手机号码不能为空", trigger: "blur" },
                //         { min: 11, max: 11, message: '手机号码长度为11位', trigger: 'blur' }
                //     ],
                //     address: [{ required: true, message: "地址不能为空", trigger: "blur" }],
                //     role: [{ required: true, message: "角色不能为空", trigger: "blur" }],
                // }, //添加表单验证规则
                /*添加对话框*/
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
                this.page(this.currentPage);
            },
            callOf(){
                this.$refs.editForm.resetFields();
                this.dialogFormVisible = false;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize=val;
                this.page(this.currentPage);
            },
            handleClose(done) {
                this.$confirm('关闭窗口不会保留之前编辑操作，确认关闭？')
                    .then(_ => {
                        this.$refs.editForm.resetFields();
                        done();
                    })
                    .catch(_ => {});
            },
            page(currentPage) {
                const _this = this
                _this.$axios.post("/car/list?currentPage=" + currentPage+"&pageSize="+ this.pageSize,this.searchInCondition).then(res => {
                    console.log(res)
                    _this.carList = res.data.data.records
                    _this.currentPage = res.data.data.current
                    _this.total = res.data.data.total
                    _this.pageSize = res.data.data.size

                })
            },submitForm() {
                const _this = this
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$axios.post('/car/edit', this.editForm, {
                            headers: {
                                "Authorization": localStorage.getItem("token")
                            }
                        }).then((res) => {
                            _this.reload()
                            this.$message({
                                message: '操作成功',
                                type: 'success'
                            });
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            },
            find(id){
                console.log(id)
                const _this = this
                this.dialogFormVisible = true
                this.$axios.get('/car/find/' + id).then((res) => {
                    const car = res.data.data
                    _this.editForm = car
                });
            },
            del(id) {
                console.log(id)
                const _this = this
                this.$confirm('确认删除？')
                    .then(_ => {
                        this.$axios.get('/car/del/' + id, {
                            headers: {
                                "Authorization": localStorage.getItem("token")
                            }
                        }).then((res) => {
                            _this.reload()
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                        });
                    })
                    .catch(_ => {});
            }
        },
        created() {
            this.page(1)
        }
    }
</script>
<style scoped>
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand/deep/ label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand/deep/ .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>
