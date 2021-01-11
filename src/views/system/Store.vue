<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb separator="/" style="padding-left: 10px;padding-bottom: 10px;font-size: 13px">
            <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>门店管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!--用户列表卡片-->
        <el-card class="box-card">
            <!--搜索框-->
            <el-form :inline="true" :model="searchInCondition" class="demo-form-inline">
                <el-form-item label="门店名">
                    <el-input clearable v-model="searchInCondition.name" placeholder="请输入门店名称"></el-input>
                </el-form-item>
                <el-form-item label="省市区">
                    <el-cascader
                            v-model="value"
                            :options="options"
                            @change="handleChange"
                            clearable
                            style="width: 300px;"
                    ></el-cascader>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" @click="onSubmit">查询</el-button>
                </el-form-item>
                <el-button type="primary" icon="el-icon-plus"  @click="dialogFormVisible=true">新增门店</el-button>
            </el-form>
            <!--添加对话框-->
            <el-dialog  title="添加车辆" :visible.sync="dialogFormVisible" width="55%"  :before-close="handleClose" >
                <el-form :model="storeForm"
                         ref="storeForm"
                         label-width="100px"
                         :inline="true"
                         class="demo-form-inline"
                         :rules=null
                >
                    <!--form-item需要添加prop属性，对应Model,否则清除表单无效-->
                    <el-form-item label="门店名称" prop="name">
                        <el-input v-model="storeForm.name" style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="门店负责人" prop="admin">
                        <el-input v-model="storeForm.admin" style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="tel">
                        <el-input v-model="storeForm.tel" style="width: 200px;"></el-input>
                    </el-form-item>

                    <el-form-item label="省市区" prop="address">
                        <el-cascader
                                v-model="value"
                                :options="options"
                                @change="handleChange"
                                clearable
                                style="width: 300px;"
                        ></el-cascader>
                    </el-form-item>
                    <el-form-item label="详细地址" prop="detail">
                        <el-input v-model="storeForm.detail" style="width: 610px"></el-input>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer" style="text-align: center">
                    <el-button @click="callOf()">取 消</el-button>
                    <el-button type="primary" @click="submitForm()">确 定</el-button>
                </div>
            </el-dialog>
            <!--表格显示-->
            <el-table
                    :data="storeList"
                    style="width: 100%;height: 100%">
                <el-table-column prop="name" label="门店名称" ></el-table-column>
                <el-table-column prop="admin" label="负责人" ></el-table-column>
                <el-table-column prop="tel" label="联系电话" ></el-table-column>
                <el-table-column prop="address" label="省市区" ></el-table-column>
                <el-table-column prop="detail" label="详细地址" ></el-table-column>
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
        name: "Store",
        data() {
            return {
                searchInCondition: {
                    name:'',
                    address:''
                },
                /*分页参数*/
                currentPage: 1,
                total: 0,
                pageSize: 5,
                /*表格*/
                storeList: [],
                /*添加对话框*/
                dialogFormVisible: false,
                // 门店级联选择
                value: [],
                options: [{
                    value: '福建省',
                    label: '福建省',
                    children: [{
                        value: '福州市',
                        label: '福州市',
                        children: [{
                            value: '机场火车站',
                            label: '机场火车站'
                        }, {
                            value: '仓山区',
                            label: '仓山区'
                        }, {
                            value: '晋安区',
                            label: '晋安区'
                        }, {
                            value: '闽侯县',
                            label: '闽侯县'
                        }]
                    }, {
                        value: '厦门市',
                        label: '厦门市',
                        children: [{
                            value: '机场火车站',
                            label: '机场火车站'
                        }, {
                            value: '湖里区',
                            label: '湖里区'
                        }, {
                            value: '翔安区',
                            label: '翔安区'
                        }]
                    }]
                }, {
                    value: '广东省',
                    label: '广东省',
                    children: [{
                        value: '广州市',
                        label: '广州市',
                        children: [{
                            value: '机场火车站',
                            label: '机场火车站'
                        }, {
                            value: '白云区',
                            label: '白云区'
                        }, {
                            value: '天河区',
                            label: '天河区'
                        }, {
                            value: '都江区',
                            label: '都江区'
                        }]
                    }]
                }, {
                    value: '四川省',
                    label: '四川省',
                    children: [{
                        value: '机场火车站',
                        label: '机场火车站'
                    }, {
                        value: '成都市',
                        label: '成都市'
                    }, {
                        value: '德阳市',
                        label: '德阳市'
                    }]
                }, {
                    value: '云南省',
                    label: '云南省',
                    children: [{
                        value: '机场火车站',
                        label: '机场火车站'
                    }, {
                        value: '昆明市',
                        label: '昆明市'
                    }, {
                        value: '丽江市',
                        label: '丽江市'
                    }]
                }, {
                    value: '广西省',
                    label: '广西省',
                    children: [{
                        value: '机场火车站',
                        label: '机场火车站'
                    }, {
                        value: '南宁市',
                        label: '南宁市'
                    }, {
                        value: '玉林市',
                        label: '玉林市'
                    }]
                }, {
                    value: '浙江省',
                    label: '浙江省',
                    children: [{
                        value: '机场火车站',
                        label: '机场火车站'
                    }, {
                        value: '杭州市',
                        label: '杭州市'
                    }, {
                        value: '苏州市',
                        label: '苏州市'
                    }]
                }
                ],

                //表单
                storeForm: {
                    id: '',
                    name: '',
                    address:'',
                    admin:'',
                    tel:'',
                    detail:''
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
            handleChange() {
                let store_address = this.value.join('/');
                this.storeForm.address = store_address
            },
            onSubmit() {
                console.log('submit!');
                this.page(this.currentPage);
            },
            callOf(){
                this.$refs.storeForm.resetFields();
                this.dialogFormVisible = false;
                this.value = '';
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize=val;
                this.page(this.currentPage);
            },
            handleClose(done) {
                this.$confirm('关闭窗口不会保留之前编辑操作，确认关闭？')
                    .then(_ => {
                        this.$refs.storeForm.resetFields();
                        this.value = '';
                        done();
                    })
                    .catch(_ => {});
            },
            page(currentPage) {
                const _this = this
                this.searchInCondition.address =  this.value.join('/');
                _this.$axios.post("/store/list?currentPage=" + currentPage+"&pageSize="+ this.pageSize,this.searchInCondition).then(res => {
                    _this.storeList = res.data.data.records
                    _this.currentPage = res.data.data.current
                    _this.total = res.data.data.total
                    _this.pageSize = res.data.data.size
                })
            },submitForm() {
                const _this = this
                this.$refs.storeForm.validate((valid) => {
                    if (valid) {
                        this.$axios.post('/store/edit', this.storeForm, {
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
                this.$axios.get('/store/find/' + id).then((res) => {
                    const store = res.data.data
                    _this.storeForm = store
                    _this.value = store.address.split('/')
                });
            },
            del(id) {
                console.log(id)
                const _this = this
                this.$confirm('确认删除？')
                    .then(_ => {
                        this.$axios.get('/store/del/' + id, {
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
