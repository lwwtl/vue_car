<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb separator="/" style="padding-left: 10px;padding-bottom: 10px;font-size: 13px">
            <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>车辆管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!--用户列表卡片-->
        <el-card class="box-card">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="车牌号">
                    <el-input clearable v-model="formInline.carNo" placeholder="请输入车牌号"></el-input>
                </el-form-item>
                <el-form-item label="车型">
                    <el-input clearable v-model="formInline.model" placeholder="请输入车型"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" @click="onSubmit">查询</el-button>
                </el-form-item>
                <el-button type="primary" icon="el-icon-circle-plus-outline">添加车辆</el-button>
            </el-form>
            <!--表格显示-->
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="商品名称">
                                <span>{{ props.row.name }}</span>
                            </el-form-item>
                            <el-form-item label="所属店铺">
                                <span>{{ props.row.shop }}</span>
                            </el-form-item>
                            <el-form-item label="商品 ID">
                                <span>{{ props.row.id }}</span>
                            </el-form-item>
                            <el-form-item label="店铺 ID">
                                <span>{{ props.row.shopId }}</span>
                            </el-form-item>
                            <el-form-item label="商品分类">
                                <span>{{ props.row.category }}</span>
                            </el-form-item>
                            <el-form-item label="店铺地址">
                                <span>{{ props.row.address }}</span>
                            </el-form-item>
                            <el-form-item label="商品描述">
                                <span>{{ props.row.desc }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                        label="车辆 ID"
                        prop="id">
                </el-table-column>
                <el-table-column
                        label="车辆名称"
                        prop="name">
                </el-table-column>
                <el-table-column
                        label="描述"
                        prop="desc">
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
        name: "Car",
        data() {
            return {
                formInline: {
                    carNo: '',
                    model:''
                },
                currentPage4: 4,
                tableData: [{
                    id: '闽A-3218H',
                    name: '北京现代',
                    category: 'suv',
                    desc: 'SUV全称是sport utility vehicle，或suburban utility vehicle，即城郊多用途汽车，是一种拥有旅行车般的空间机能，配以货卡车的越野能力的车型。',
                    address: '福州市仓山区',
                    shop: '仓山区万达自助点',
                    shopId: '10333'
                }, {
                    id: '闽A-3218H',
                    name: '北京现代',
                    category: 'suv',
                    desc: 'SUV全称是sport utility vehicle，或suburban utility vehicle，即城郊多用途汽车，是一种拥有旅行车般的空间机能，配以货卡车的越野能力的车型。',
                    address: '福州市仓山区',
                    shop: '仓山区万达自助点',
                    shopId: '10333'
                }, {
                    id: '闽A-3218H',
                    name: '北京现代',
                    category: 'suv',
                    desc: 'SUV全称是sport utility vehicle，或suburban utility vehicle，即城郊多用途汽车，是一种拥有旅行车般的空间机能，配以货卡车的越野能力的车型。',
                    address: '福州市仓山区',
                    shop: '仓山区万达自助点',
                    shopId: '10333'
                }, {
                    id: '闽A-3218H',
                    name: '北京现代',
                    category: 'suv',
                    desc: 'SUV全称是sport utility vehicle，或suburban utility vehicle，即城郊多用途汽车，是一种拥有旅行车般的空间机能，配以货卡车的越野能力的车型。',
                    address: '福州市仓山区',
                    shop: '仓山区万达自助点',
                    shopId: '10333'
                }, {
                    id: '闽A-3218H',
                    name: '北京现代',
                    category: 'suv',
                    desc: 'SUV全称是sport utility vehicle，或suburban utility vehicle，即城郊多用途汽车，是一种拥有旅行车般的空间机能，配以货卡车的越野能力的车型。',
                    address: '福州市仓山区',
                    shop: '仓山区万达自助点',
                    shopId: '10333'
                }, ]
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
            }
        }
    }
</script>

<style scoped>
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>