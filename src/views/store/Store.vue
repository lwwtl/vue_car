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
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="位置">
                    <el-cascader
                            placeholder="试试搜索：闽侯县"
                            :options="options"
                            filterable></el-cascader>
                </el-form-item>
                <el-form-item label="门店">
                    <el-input clearable v-model="formInline.storeName" placeholder="请输入门店名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button icon="e  l-icon-search" @click="onSubmit">查询</el-button>
                </el-form-item>
                <el-button type="primary" icon="el-icon-circle-plus-outline">添加门店</el-button>
            </el-form>
            <!--表格显示-->
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%;height: 400px">
                <el-table-column
                        prop="name"
                        label="名称"
                        >
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="地址"
                        >
                </el-table-column>
                <el-table-column
                        prop="tel"
                        label="联系方式">
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
        name: "Store",
        data() {
            return {
                formInline: {
                    storeName: '',
                    email: '',
                    food:''
                },
                currentPage4: 4,
                options: [{
                    value: 'fujian',
                    label: '福建省',
                    children: [{
                        value: 'fuzhou',
                        label: '福州市',
                        children: [{
                            value: 'minhou',
                            label: '闽侯县'
                        }, {
                            value: 'jinan',
                            label: '晋安区'
                        }, {
                            value: 'taijian',
                            label: '台江区'
                        }, {
                            value: 'cangshan',
                            label: '仓山区'
                        }]
                    }, {
                        value: 'xiamen',
                        label: '厦门市',
                        children: [{
                            value: 'huli',
                            label: '湖里区'
                        }, {
                            value: 'xiangan',
                            label: '翔安区'
                        }]
                    }]
                },{
                    value: 'gds',
                    label: '广东省',
                    children: [{
                        value: 'gzs',
                        label: '广州市',
                        children: [{
                            value: 'byq',
                            label: '白云区'
                        }, {
                            value: 'thq',
                            label: '天河区'
                        }, {
                            value: 'hzq',
                            label: '海珠区'
                        }, {
                            value: 'nhq',
                            label: '南海区'
                        }]
                    }, {
                        value: 'szs',
                        label: '深圳市',
                        children: [{
                            value: 'ftq',
                            label: '福田区'
                        }, {
                            value: 'lhq',
                            label: '罗湖区'
                        }, {
                            value: 'nsq',
                            label: '南山区'
                        }]
                    }]
                },{
                    value: 'shs',
                    label: '上海市',
                    children: [{
                        value: 'jaq',
                        label: '静安区'
                    },{
                        value: 'xhq',
                        label: '徐汇区'
                    }, {
                        value: 'hkq',
                        label: '虹口区'
                    }, {
                        value: 'ypq',
                        label: '杨浦区'
                    },  ]
                }
                ],
                tableData: [{
                    name: '仓山万达自助点',
                    tel: 13075816962,
                    address: '福州市仓山区万达广场 1518 弄'
                },{
                    name: '仓山万达自助点',
                    tel: 13075816962,
                    address: '福州市仓山区万达广场 1518 弄'
                },{
                    name: '仓山万达自助点',
                    tel: 13075816962,
                    address: '福州市仓山区万达广场 1518 弄'
                },{
                    name: '仓山万达自助点',
                    tel: 13075816962,
                    address: '福州市仓山区万达广场 1518 弄'
                } ]
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

</style>