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
            <el-dialog  title="添加员工" :visible.sync="dialogFormVisible" width="50%"  :before-close="handleClose" >
                <el-form :model="editForm"
                         ref="editForm"
                         label-width="80px"
                         :inline="true"
                         class="demo-form-inline"
                         :rules=editFormRules

                >
                    <!--form-item需要添加prop属性，对应Model,否则清除表单无效-->
                    <el-form-item label="帐号" prop="account">
                        <el-input v-model="editForm.account"  style="width: 150px"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="editForm.password" style="width: 150px" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="editForm.name" style="width: 150px"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="gender">
                        <div style="width: 150px">
                            <el-radio v-model="editForm.gender" label="1">男</el-radio>
                            <el-radio v-model="editForm.gender" label="0" style="padding-left: 28px">女</el-radio>
                        </div>
                    </el-form-item>
<!--                    <el-form-item label="性别" prop="gender">-->
<!--                        <el-input v-model="editForm.gender" style="width: 120px"></el-input>-->
<!--                    </el-form-item>-->
                    <el-form-item label="年龄" prop="age">
                        <el-input v-model="editForm.age" style="width: 150px"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="mobile">
                        <el-input v-model="editForm.mobile" style="width: 150px"></el-input>
                    </el-form-item>
                    <el-form-item label="角色" prop="role">
                        <div style="width: 150px">
                            <el-radio v-model="editForm.role" label="a">管理员</el-radio>
                            <el-radio v-model="editForm.role" label="e">员工</el-radio>
                        </div>
                    </el-form-item>
                    <el-form-item label="住址" prop="address">
                        <el-input v-model="editForm.address" style="width: 390px"></el-input>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer" style="text-align: center">
                    <el-button @click="callOf()">取 消</el-button>
                    <el-button type="primary" @click="submitForm()">确 定</el-button>
                </div>
            </el-dialog>
            <!--表格显示-->
            <el-table
                    :data="employeeList"
                    style="width: 100%;height: 100%">
                <el-table-column prop="role" :formatter="showRole" label="角色" ></el-table-column>
                <el-table-column prop="account" label="员工帐号" ></el-table-column>
                <el-table-column prop="name" label="姓名" ></el-table-column>
                <el-table-column prop="gender" :formatter="showGender"  label="性别"></el-table-column>
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
                    account: [
                        { required: true, message: "不能为空", trigger: "blur" },
                        { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
                        ],
                    password: [
                        { required: true, message: "不能为空", trigger: "blur" },
                        { min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'blur' }
                        ],
                    name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
                    gender: [{ required: true, message: "性别不能为空", trigger: "blur" }],
                    age: [{ required: true, message: "年龄不能为空", trigger: "blur" }],
                    mobile: [
                        { required: true, message: "手机号码不能为空", trigger: "blur" },
                        { min: 11, max: 11, message: '手机号码长度为11位', trigger: 'blur' }
                    ],
                    address: [{ required: true, message: "地址不能为空", trigger: "blur" }],
                    role: [{ required: true, message: "角色不能为空", trigger: "blur" }],
                }, //添加表单验证规则
                /*添加对话框*/
            }
        },
        methods: {
            onSubmit() {
                this.page(this.currentPage)
            },
            callOf(){
                this.$refs.editForm.resetFields();
                this.dialogFormVisible = false;
            },
            handleClose(done) {
                this.$confirm('关闭窗口不会保留之前编辑操作，确认关闭？')
                    .then(_ => {
                        this.$refs.editForm.resetFields();
                        done();
                    })
                    .catch(_ => {});
            },
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
            showGender(row) {
                return row.gender == 1 ? "男" : "女";
            },
            showRole(row) {
                return row.role == "a" ? "管理员" : "员工";
            },
            submitForm() {
                const _this = this
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$axios.post('/employee/edit', this.editForm, {
                            headers: {
                                "Authorization": localStorage.getItem("token")
                            }
                        }).then((res) => {
                            _this.reload()
                            this.$notify({
                                title: '操作成功',
                                type: 'success',
                                duration:2*1000
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
                        _this.editForm = emp
                    });
            },
            del(id){
                console.log(id)
                const _this = this
                this.$confirm('确认删除？')
                    .then(_ => {
                        if (this.$store.getters.getUser.id == id) {
                            this.$notify({
                                title: '操作成功',
                                message: '不能删除当前登录用户！',
                                type: 'warning',
                                duration:2*1000
                            });
                        } else {
                            this.$axios.get('/employee/del/' + id, {
                                headers: {
                                    "Authorization": localStorage.getItem("token")
                                }
                            }).then((res) => {
                                _this.reload()
                                this.$notify({
                                    title: '删除成功',
                                    type: 'success',
                                    duration:2*1000
                                });
                            });
                        }
                    })
            }
        },
        created() {
            this.page(1)
        }
    }
</script>

<style scoped>

</style>