<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb separator="/" style="padding-left: 10px;padding-bottom: 10px;font-size: 13px">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>业务管理</el-breadcrumb-item>
            <el-breadcrumb-item>租赁业务管理</el-breadcrumb-item>
            <el-breadcrumb-item>车辆出库</el-breadcrumb-item>
        </el-breadcrumb>
        <!--用户列表卡片-->
        <el-card class="box-card">
            <el-form :inline="true" :model="searchInCondition" class="demo-form-inline">
                <el-form-item label="订单编号">
                    <el-input clearable v-model="searchInCondition.id" placeholder="请输入订单编号"></el-input>
                </el-form-item>
                <el-form-item label="用户账号">
                    <el-input clearable v-model="searchInCondition.account" placeholder="请输入用户账号"></el-input>
                </el-form-item>
                <el-form-item label="车牌号">
                    <el-input clearable v-model="searchInCondition.cno" placeholder="请输入车牌号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
            <!--表格显示-->

            <el-table
                    :data="orderList"
                    style="width: 100%;height:100%"
                    :row-class-name="tableRowClassName">
                <el-table-column  label="订单编号">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p>开始时间: {{ scope.row.orderStart }}</p>
                            <p>结束时间: {{ scope.row.orderEnd }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="large">{{ scope.row.orderId }}</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="用户信息" >
                    <template slot-scope="scope">
                        <el-button size="small" type="warning" @click="findUser(scope.row.userId)">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="车辆信息" >
                    <template slot-scope="scope">
                        <el-button size="small" type="warning" @click="findCar(scope.row.carId)">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="订单详情" >
                    <template slot-scope="scope">
                        <el-button size="small" type="primary" @click="find(scope.row.orderId)">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="orderState" label="订单状态"></el-table-column>
                <el-table-column label="操作" >
                    <template slot-scope="scope">
                        <el-button size="small" type="success" @click="storeIn(scope.row.orderId)">入库</el-button>
                    </template>
                </el-table-column>

            </el-table>
            <!--查看对话框-->
            <el-dialog  title="订单详情" :visible.sync="dialogFormVisible" width="55%"  :before-close="handleClose" >
                <el-form :model="orderForm"
                         label-width="100px"
                         :inline="true"
                         class="demo-form-inline"
                         :rules=null
                >
                    <!--form-item需要添加prop属性，对应Model,否则清除表单无效-->
                    <el-form-item label="租赁时间" prop="orderStart">
                        <el-input v-model="orderForm.orderStart" :disabled=true style="width: 220px;"></el-input>
                    </el-form-item>
                    <el-form-item label="归还时间" prop="orderEnd">
                        <el-input v-model="orderForm.orderEnd" :disabled=true style="width: 220px;"></el-input>
                    </el-form-item>
                    <el-form-item label="出车门店" prop="orderSource">
                        <el-input v-model="orderForm.orderSource" :disabled=true style="width: 220px;"></el-input>
                    </el-form-item>
                    <el-form-item label="还车门店" prop="orderDestination">
                        <el-input v-model="orderForm.orderDestination" :disabled=true style="width: 220px;"></el-input>
                    </el-form-item>
                    <el-form-item label="租期" prop="orderRentDays">
                        <el-input v-model="orderForm.orderRentDays" :disabled=true style="width: 220px;"></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间" prop="orderCreate">
                        <el-input v-model="orderForm.orderCreate" :disabled=true style="width: 220px;"></el-input>
                    </el-form-item>
                    <el-form-item label="订单状态" prop="orderState">
                        <el-input v-model="orderForm.orderState" :disabled=true style="width: 220px;"></el-input>
                    </el-form-item>
                    <el-form-item label="押金扣除" prop="orderState">
                        <el-input v-model="orderForm.orderExtra" :disabled=true style="width: 220px;"></el-input>
                    </el-form-item>
                    <el-form-item label="订单总价" prop="orderTotal">
                        <el-input v-model="orderForm.orderTotal" :disabled=true style="width: 220px;"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" style="text-align: center">
                    <el-button @click="callOf()">关 闭</el-button>
                </div>
            </el-dialog>
            <!--用户信息对话框-->
            <el-dialog  title="用户信息" :visible.sync="dialogUser" width="50%"  :before-close="handleClose" >
                <el-form :model="userForm"
                         ref="editForm"
                         label-width="80px"
                         :inline="true"
                         class="demo-form-inline"
                         :rules=null
                         :disabled="true"
                >

                    <el-form-item label="帐号" prop="account">
                        <el-input v-model="userForm.account"  style="width: 150px"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="userForm.password" style="width: 150px" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="userForm.name" style="width: 150px"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="gender">
                        <div style="width: 150px">
                            <el-radio v-model="userForm.gender" label="1">男</el-radio>
                            <el-radio v-model="userForm.gender" label="0" style="padding-left: 28px">女</el-radio>
                        </div>
                    </el-form-item>
                    <el-form-item label="年龄" prop="age">
                        <el-input v-model="userForm.age" style="width: 150px"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="mobile">
                        <el-input v-model="userForm.mobile" style="width: 150px"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="userForm.email" style="width: 150px"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" prop="number">
                        <el-input v-model="userForm.number" style="width: 150px"></el-input>
                    </el-form-item>
                    <el-form-item label="驾照编号" prop="license">
                        <el-input v-model="userForm.license" style="width: 150px"></el-input>
                    </el-form-item>
                    <el-form-item label="住址" prop="address">
                        <el-input v-model="userForm.address" style="width: 390px"></el-input>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer" style="text-align: center">
                    <el-button @click="callOf()">关 闭</el-button>
                </div>
            </el-dialog>
            <!--车辆信息对话框-->
            <el-dialog  title="车辆信息" :visible.sync="dialogCar" width="55%"  :before-close="handleClose" >
                <el-form :model="editForm"
                         ref="editForm"
                         label-width="80px"
                         :inline="true"
                         class="demo-form-inline"
                         :rules=null
                         :disabled=true
                >
                    <!--form-item需要添加prop属性，对应Model,否则清除表单无效-->
                    <el-form-item label="车牌号" prop="no">
                        <el-input v-model="editForm.no"  style="width: 150px"></el-input>
                    </el-form-item>
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="editForm.name" style="width: 150px" ></el-input>
                    </el-form-item>
                    <el-form-item label="品牌" prop="brand">
                        <el-input v-model="editForm.brand" style="width: 150px"></el-input>
                    </el-form-item>
                    <el-form-item label="价格" prop="price">
                        <el-input v-model="editForm.price" style="width: 150px" placeholder="单位：万元"></el-input>
                    </el-form-item>
                    <el-form-item label="租金" prop="rent">
                        <el-input v-model="editForm.rent" style="width: 150px" placeholder="单位：元"></el-input>
                    </el-form-item>
                    <el-form-item label="车辆押金" prop="deposit">
                        <el-input v-model="editForm.deposit" style="width: 150px"></el-input>
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
                                    :label="item.label"
                                    :value="item.value_type">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="变速" prop="model">
                        <div style="width: 178px">
                            <el-radio v-model="editForm.model" label="手动挡">手动挡</el-radio>
                            <el-radio v-model="editForm.model" label="自动挡">自动挡</el-radio>
                        </div>
                    </el-form-item>

                    <el-form-item label="省市区" prop="region">
                        <el-input v-model="editForm.region" style="width: 390px"></el-input>
                    </el-form-item>
                    <el-form-item label="车辆状态" prop="state">
                        <div style="width: 180px">
                            <el-radio v-model="editForm.state" label="已出库">已出库</el-radio>
                            <el-radio v-model="editForm.state" label="已入库">已入库</el-radio>
                        </div>
                    </el-form-item>
                    <el-form-item label="所属门店" prop="store">
                        <el-input v-model="editForm.store" style="width: 150px"></el-input>
                    </el-form-item>
                    <div>
                        <el-form-item label="车辆图片" prop="img" >
                            <img :src="editForm.img" style="width: 150px">
                        </el-form-item>
                    </div>
                </el-form>
                <div slot="footer" class="dialog-footer" style="text-align: center">
                    <el-button @click="callOf()">关 闭</el-button>
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
        name: "StoreIn",
        data() {
            return {
                searchInCondition: {
                    id: '',
                    account:'',
                    cno: '',
                    state:'进行中'
                },
                /*订单表格*/
                orderList:[],
                /*分页参数*/
                currentPage: 1,
                total: 0,
                pageSize: 5,
                /*订单对话框*/
                dialogFormVisible: false,
                /*用户对话框*/
                dialogUser: false,
                /*车辆对话框*/
                dialogCar: false,
                orderForm:{
                    orderId: '',
                    userId: '',
                    carId:'',
                    orderStart:'',
                    orderEnd:'',
                    orderSource:'',
                    orderDestination:'',
                    orderRentDays:'',
                    orderCreate:'',
                    orderState:'',
                    orderTotal:'',
                    orderExtra:''
                },
                /*用户信息*/
                userForm: {
                    id:'',
                    account: '',
                    password: '',
                    name: '',
                    gender: '',
                    age: '',
                    mobile: '',
                    email:'',
                    number:'',
                    license:'',
                    state:'',
                    address: ''
                },
                /*车辆信息*/
                editForm: {
                    id: '',
                    no: '',
                    name: '',
                    model: '',
                    type: '',
                    box: '',
                    output: '',
                    seat: '',
                    brand: '',
                    price: '',
                    rent: '',
                    img:'',
                    state: '',
                    store: '',
                    region:'',
                    deposit:''
                },
                /*车辆信息*/
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
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            handleClose(done) {
                done();
            },
            callOf(){
                this.dialogFormVisible = false;
                this.dialogUser = false;
                this.dialogCar = false;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize=val;
                this.page(this.currentPage);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success-row';
                }
                return '';
            },
            onSubmit() {
                console.log('submit!');
                this.page(this.currentPage);
            },
            page(currentPage) {
                const _this = this
                _this.$axios.post("/order/list?currentPage=" + currentPage + "&pageSize=" + this.pageSize, this.searchInCondition).then(res => {
                    _this.orderList = res.data.data.records
                    _this.currentPage = res.data.data.current
                    _this.total = res.data.data.total
                    _this.pageSize = res.data.data.size
                })
            },
            find(id){
                const _this = this
                this.dialogFormVisible = true
                this.$axios.get('/order/find/' + id).then((res) => {
                    _this.orderForm = res.data.data
                });
            },
            findUser(id){
                console.log(id)
                const _this = this
                this.dialogUser = true
                this.$axios.get('/user/find/' + id).then((res) => {
                    const emp = res.data.data
                    _this.userForm = emp
                });
            },
            findCar(id){
                //console.log(id)
                const _this = this
                this.dialogCar = true
                this.$axios.get('/car/find/' + id).then((res) => {
                    const car = res.data.data
                    _this.editForm = car
                    _this.value_type = car.type.split(',')
                });
            },
            storeIn(id){
                const _this = this
                this.$axios.get('/order/storeIn/' + id).then((res) => {
                    _this.reload()
                    this.$notify({
                        title: res.data.data,
                        type: 'success',
                        duration:2*1000
                    });
                });
            }
        },
        created() {
            this.page(1)
        }
    }
</script>

<style scoped>
    .el-table .warning-row {
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }
</style>