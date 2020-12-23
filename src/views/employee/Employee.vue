<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb separator="/" style="padding-left: 10px;padding-bottom: 10px;font-size: 13px">
            <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!--用户列表卡片-->
        <el-card class="box-card">
            <el-form :inline="true" :model="searchInCondition" class="demo-form-inline">
                <el-form-item label="姓名">
                    <el-input clearable v-model="searchInCondition.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input clearable v-model="searchInCondition.mobile" placeholder="请输入电话"></el-input>
                </el-form-item>
                <!--加上clearable和上一行对齐-->
                <el-form-item>
                    <el-button icon="el-icon-search" @click="onSubmit">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible=true">添加</el-button>
                </el-form-item>
            </el-form>
            <!--添加对话框-->
            <el-dialog  title="添加员工" :visible.sync="dialogFormVisible" width="50%"  >
                <el-form :model="editForm"
                         ref="editForm"
                         label-width="80px"
                         :inline="true"
                         class="demo-form-inline"
                         :rules=null
                >
                    <el-form-item label="帐号" >
                        <el-input v-model="editForm.account" style="width: 120px"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" >
                        <el-input v-model="editForm.password" style="width: 120px" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" >
                        <el-input v-model="editForm.name" style="width: 120px"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" >
                        <el-input v-model="editForm.gender" style="width: 120px"></el-input>
                    </el-form-item>
                    <el-form-item label="年龄" >
                        <el-input v-model="editForm.age" style="width: 120px"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" >
                        <el-input v-model="editForm.mobile" style="width: 120px"></el-input>
                    </el-form-item>
                    <el-form-item label="住址" >
                        <el-input v-model="editForm.address" style="width: 120px"></el-input>
                    </el-form-item>
                    <el-form-item label="角色" >
                        <el-input v-model="editForm.role" style="width: 120px"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="callOf()">取 消</el-button>
                    <el-button type="primary" @click="submitForm()">确 定</el-button>
                </div>
            </el-dialog>
            <!--表格显示-->
            <el-table
                    :data="employeeList"
                    style="width: 100%;height: 100%">
                <el-table-column prop="role" label="角色" ></el-table-column>
                <el-table-column prop="account" label="员工帐号" ></el-table-column>
                <el-table-column prop="name" label="姓名" ></el-table-column>
                <el-table-column prop="gender" label="性别"></el-table-column>
                <el-table-column prop="age" label="年龄" ></el-table-column>
                <el-table-column prop="mobile" label="电话" ></el-table-column>
                <el-table-column prop="address" label="住址" ></el-table-column>
                <el-table-column prop="lastTime" label="上次登录" ></el-table-column>
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
        name: "Employee",
        data() {
            return {
                /*查询条件*/
                searchInCondition: {
                    name: '',
                    mobile: ''
                },
                /*分页参数*/
                currentPage: 1,
                total: 0,
                pageSize: 5,
                /*表格*/
                employeeList: [],
                /*添加对话框*/
                dialogFormVisible: false,
                editForm: {
                    id:'',
                    account: '',
                    password: '',
                    name: '',
                    gender: '',
                    age: '',
                    mobile: '',
                    address: '',
                    role:''
                },
                editFormRules: {
                    id: [{ required: true, message: "不能为空", trigger: "blur" }],
                    account: [{ required: true, message: "不能为空", trigger: "blur" }],
                    password: [{ required: true, message: "不能为空", trigger: "blur" }],
                    name: [{ required: true, message: "不能为空", trigger: "blur" }],
                    gender: [{ required: true, message: "不能为空", trigger: "blur" }],
                    age: [{ required: true, message: "不能为空", trigger: "blur" }],
                    mobile: [{ required: true, message: "不能为空", trigger: "blur" }],
                    address: [{ required: true, message: "不能为空", trigger: "blur" }],
                }, //添加表单验证规则
                /*添加对话框*/
            }
        },
        methods: {
            onSubmit() {
                this.page(this.currentPage)
            },
            callOf(){
                this.dialogFormVisible = false;
                this.$refs.editForm.resetFields();
            },
            // closeDialog(done){
            //     this.$confirm('确认关闭？')
            //         .then(_ => {
            //             done();
            //             location.reload();
            //         })
            //         .catch(_ => { });
            // },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize=val;
                this.page(this.currentPage);
            },
            page(currentPage) {
                const _this = this
                _this.$axios.post("/employee/list?currentPage=" + currentPage+"&pageSize="+ this.pageSize,this.searchInCondition).then(res => {
                    console.log(res)
                    _this.employeeList = res.data.data.records
                    _this.currentPage = res.data.data.current
                    _this.total = res.data.data.total
                    _this.pageSize = res.data.data.size

                })
            },
            submitForm() {
                const _this = this
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$axios.post('/employee/add', this.editForm, {
                            headers: {
                                "Authorization": localStorage.getItem("token")
                            }
                        }).then((res) => {
                            _this.$alert('操作成功', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                callback: action => {
                                    _this.reload()
                                }
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
                this.$axios.get('/employee/find/' + id).then((res) => {
                        const emp = res.data.data
                        _this.editForm.id = emp.id
                        _this.editForm.account = emp.account
                        _this.editForm.password = emp.password
                        _this.editForm.name = emp.name
                        _this.editForm.gender = emp.gender
                        _this.editForm.age = emp.age
                        _this.editForm.address = emp.address
                        _this.editForm.mobile = emp.mobile
                        _this.editForm.role = emp.role

                    });
            },
            del(id){
                console.log(id)
                const _this = this
                if(this.$store.getters.getUser.id==id){
                    this.$confirm('不能删除当前登录用户!', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                }else{
                    this.$axios.get('/employee/del/'+id, {
                        headers: {
                            "Authorization": localStorage.getItem("token")
                        }
                    }).then((res) => {
                        _this.$alert('操作成功', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                _this.reload()
                            }
                        });
                    });
                }
            }
        },
        created() {
            this.page(1)
        }
    }
</script>

<style scoped>

</style>