<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb separator="/" style="padding-left: 10px;padding-bottom: 10px;font-size: 13px">
            <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>业务管理</el-breadcrumb-item>
            <el-breadcrumb-item>租赁业务管理</el-breadcrumb-item>
            <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!--用户列表卡片-->
        <el-card class="box-card">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="联系方式">
                    <el-input clearable v-model="formInline.tel" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="车牌号">
                    <el-input clearable v-model="formInline.carId" placeholder="请输入车牌号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
            <!--表格显示-->

            <el-table
                    :data="tableData"
                    style="width: 100%;height: 400px"
                    :row-class-name="tableRowClassName">
                <el-table-column
                        prop="id"
                        label="订单编号"
                        >
                </el-table-column>
                <el-table-column
                        prop="userName"
                        label="客户名字"
                        >
                </el-table-column>
                <el-table-column
                        prop="carId"
                        label="车牌号">
                </el-table-column>
                <el-table-column
                        prop="state"
                        label="订单状态">
                </el-table-column>
                <el-table-column
                        prop="startTime"
                        label="租赁时间">
                </el-table-column>
                <el-table-column
                        prop="endTime"
                        label="归还时间">
                </el-table-column>
                <el-table-column
                        prop="days"
                        label="租用天数">
                </el-table-column>
                <el-table-column
                        prop="total"
                        label="订单总价">
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        label="创建时间">
                </el-table-column>
            </el-table>
            <!--分页区域-->
            <el-pagination
                    style="padding-top: 20px"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "OrderDetail",
        data() {
            return {
                formInline: {
                    tel: '',
                    carId: '',
                },
                currentPage4: 4,
                tableData: [{
                    id:'13432',
                    userName: '许国强',
                    tel: 13078243694,
                    carId:'闽A-5312N',
                    state:'进行中',
                    startTime:'2020-12-15',
                    endTime:'2020-12-16',
                    days:'1',
                    total:'685',
                    createTime:'2020-12-01'
                },{
                    id:'13432',
                    userName: '许国强',
                    tel: 13078243694,
                    carId:'闽A-5312N',
                    state:'进行中',
                    startTime:'2020-12-15',
                    endTime:'2020-12-16',
                    days:'1',
                    total:'685',
                    createTime:'2020-12-01'
                },{
                    id:'13432',
                    userName: '许国强',
                    tel: 13078243694,
                    carId:'闽A-5312N',
                    state:'进行中',
                    startTime:'2020-12-15',
                    endTime:'2020-12-16',
                    days:'1',
                    total:'685',
                    createTime:'2020-12-01'
                },{
                    id:'13432',
                    userName: '许国强',
                    tel: 13078243694,
                    carId:'闽A-5312N',
                    state:'进行中',
                    startTime:'2020-12-15',
                    endTime:'2020-12-16',
                    days:'1',
                    total:'685',
                    createTime:'2020-12-01'
                },]
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
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