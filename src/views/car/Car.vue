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
            <el-dialog  title="添加车辆" :visible.sync="dialogFormVisible" width="55%"  :before-close="handleClose" >
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
                    <el-form-item label="变速" prop="model">
                        <div style="width: 178px">
                            <el-radio v-model="editForm.model" label="手排">手排</el-radio>
                            <el-radio v-model="editForm.model" label="自排">自排</el-radio>
                        </div>
                    </el-form-item>
                    <el-form-item label="类型" prop="type">
                        <el-select
                                v-model="value_type"
                                multiple
                                filterable
                                allow-create
                                default-first-option
                                placeholder="请选择车辆类型"
                                style="width: 390px"
                        >
                            <el-option
                                    v-for="item in options_type"
                                    :key="item.value_type"
                                    :label="item.value_type"
                                    :value="item.value_type">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="车辆状态" prop="state">
                        <div style="width: 180px">
                            <el-radio v-model="editForm.state" label="已出库">已出库</el-radio>
                            <el-radio v-model="editForm.state" label="已入库">已入库</el-radio>
                        </div>
                    </el-form-item>
<!--                    <el-form-item label="所属门店" prop="store">-->
<!--                        <el-input v-model="editForm.store" style="width: 390px"></el-input>-->
<!--                    </el-form-item>-->
                    <div class="block">
                        <el-form-item label="所属门店" prop="store">
                        <el-cascader
                                v-model="value"
                                :options="options"
                                @change="handleChange"
                                clearable
                                style="width: 390px"
                        ></el-cascader>
                        </el-form-item>
                    </div>
                    <div style="padding-left: 80px">
                        <el-upload
                                class="avatar-uploader"
                                action="http://localhost:8888/car/upload/img"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl!=''" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon">上传图片</i>
                        </el-upload>
                    </div>
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
                    <template width="100" slot-scope="scope">
                        <img style="width:100px;border:none;" :src="scope.row.img">
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
                //对话框中下拉选项
                imageUrl:'',
                options_type: [{
                    value_type: '经济型',
                    label: '经济型'
                }, {
                    value_type: '舒适型',
                    label: '舒适型'
                }, {
                    value_type: '豪华型',
                    label: '豪华型'
                }, {
                    value_type: 'SUV',
                    label: 'SUV'
                }, {
                    value_type: '商务型',
                    label: '商务型'
                }, {
                    value_type: '电动型',
                    label: '电动型'
                }],
                value_type:[],
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
                            label: '机场火车站',
                            children:[{
                                value:'福州机场店',
                                label:'福州机场店'
                            },{
                                value:'福州高铁南站便捷点',
                                label:'福州高铁南站便捷点'
                            },{
                                value:'福州火车站便捷点',
                                label:'福州火车站便捷点'
                            },{
                                value:'永泰站便捷点',
                                label:'永泰站便捷点'
                            }]
                        }, {
                            value: '仓山区',
                            label: '仓山区',
                            children:[{
                                value:'金山大道店',
                                label:'金山大道店'
                            },{
                                value:'则徐大道店',
                                label:'则徐大道店'
                            },{
                                value:'白湖亭店',
                                label:'白湖亭店'
                            },{
                                value:'华夏汽车城',
                                label:'华夏汽车城'
                            }]
                        }, {
                            value: '晋安区',
                            label: '晋安区',
                            children:[{
                                value:'丰泽元便捷点',
                                label:'丰泽元便捷点'
                            },{
                                value:'省彩印厂便捷点',
                                label:'省彩印厂便捷点'
                            }]
                        }, {
                            value: '闽侯县',
                            label: '闽侯县',
                            children:[{
                                value:'师大西门便捷点',
                                label:'师大西门便捷点'
                            },{
                                value:'工程学院便捷点',
                                label:'工程学院便捷点'
                            }]
                        }]
                    }, {
                        value: '厦门市',
                        label: '厦门市',
                        children: [{
                            value: '机场火车站',
                            label: '机场火车站',
                            children:[{
                                value:'高崎机场T4店',
                                label:'高崎机场T4店'
                            },{
                                value:'高崎机场T2店',
                                label:'高崎机场T2店'
                            },{
                                value:'厦门站店',
                                label:'厦门站店'
                            },{
                                value:'厦门北站店',
                                label:'厦门北站店'
                            }]
                        }, {
                            value: '湖里区',
                            label: '湖里区',
                            children:[{
                                value:'湖里区便捷点1',
                                label:'湖里区便捷点1'
                            },{
                                value:'湖里区便捷点2',
                                label:'湖里区便捷点2'
                            }]
                        }, {
                            value: '翔安区',
                            label: '翔安区',
                            children:[{
                                value:'翔安区便捷点1',
                                label:'翔安区便捷点1'
                            },{
                                value:'翔安区便捷点2',
                                label:'翔安区便捷点2'
                            }]
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
                handleChange() {
                    let car_store = this.value.join('/');
                    this.editForm.store = car_store
                },
            onSubmit() {
                console.log('submit!');
                this.page(this.currentPage);
            },
            callOf(){
                this.$refs.editForm.resetFields();
                this.dialogFormVisible = false;
                this.value_type = '';
                this.imageUrl = '';
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
                        this.$refs.editForm.resetFields();
                        this.value_type = '';
                        this.imageUrl = '';
                        this.value = '';
                        done();
                    })
                    .catch(_ => {});
            },
            page(currentPage) {
                const _this = this
                _this.$axios.post("/car/list?currentPage=" + currentPage+"&pageSize="+ this.pageSize,this.searchInCondition).then(res => {
                    _this.carList = res.data.data.records
                    _this.currentPage = res.data.data.current
                    _this.total = res.data.data.total
                    _this.pageSize = res.data.data.size

                })
            },submitForm() {
                const _this = this
                let tag = this.value_type.join(',');
                this.editForm.type = tag
                this.editForm.img = this.imageUrl
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
                    _this.imageUrl = car.img
                    _this.value_type = car.type.split(',')
                    _this.value = car.store.split('/')
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
            },
            handleAvatarSuccess(res, file) {
                console.log(res)
                this.imageUrl = res.data
            },
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isLt2M;
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
    /*图片*/
    .avatar-uploader/deep/ .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader/deep/ .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 18px;
        color: #8c939d;
        width: 138px;

        line-height: 138px;
        text-align: center;
    }
    .avatar {
        width: 138px;

        display: block;
    }
</style>
