<template>
    <el-container class="main_container">
        <!--头部布局-->
        <el-header>
            <div class="left_box">
                <span>汽车租赁管理系统</span>
            </div>
            <div class="right_box">
                <el-dropdown>
                    <span class="el-dropdown-link">
                        {{user.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-show="hasLogin">
                            <el-link :underline="false" @click="logout">退出登录</el-link>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-header>
        <el-container>
            <!--侧边栏-->
            <el-aside :width="isCollapse?'69px':'200px'">
                <!--展开/收起-->
                <div class="toggle_box" @click="toggleCollapse()">
                    <i :class="isCollapse?'el-icon-arrow-right':'el-icon-arrow-left'"></i>
                </div>
                <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        :collapse="isCollapse"
                        :collapse-transition="false"
                        :unique-opened="true"
                        :router="true"
                        :default-active="activePath"
                >
                    <MenuTree :menuList="this.menuList"></MenuTree>
                </el-menu>
            </el-aside>
            <el-main>
                <!--路由视图-->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import MenuTree from "../components/MenuTree";

    export default {
        name: "Main",
        data(){
            return{
                isCollapse:true,
                activePath:'',
                user:{
                    name:'',
                    role:''
                },
                hasLogin:false,
                menuList:[
                    {
                        "id": 1,
                        "parentId": 0,
                        "menuName": "系统管理",
                        "url": "",
                        "icon": "el-icon-setting",
                        "orderNum": 1,
                        "open": 1,
                        "disabled": false,
                        "perms": null,
                        "type": 0,
                        "children": [
                            {
                                "id": 226,
                                "parentId": 1,
                                "menuName": "员工管理",
                                "url": "/employee",
                                "icon": "el-icon-user",
                                "orderNum": 2,
                                "open": 0,
                                "disabled": false,
                                "perms": "users",
                                "type": 0,
                                "children": []
                            },
                            {
                                "id": 132,
                                "parentId": 1,
                                "menuName": "门店管理",
                                "url": "/store",
                                "icon": "el-icon-user",
                                "orderNum": 2,
                                "open": 0,
                                "disabled": false,
                                "perms": null,
                                "type": 0,
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": 22,
                        "parentId": 0,
                        "menuName": "用户管理",
                        "url": "",
                        "icon": "el-icon-setting",
                        "orderNum": 2,
                        "open": 1,
                        "disabled": false,
                        "perms": null,
                        "type": 0,
                        "children": [
                            {
                                "id": 598,
                                "parentId": 2,
                                "menuName": "用户信息",
                                "url": "/userInfo",
                                "icon": "el-icon-user",
                                "orderNum": 2,
                                "open": 0,
                                "disabled": false,
                                "perms": null,
                                "type": 0,
                                "children": []
                            },
                            {
                                "id": 599,
                                "parentId": 2,
                                "menuName": "黑名单管理",
                                "url": "/heimingdang",
                                "icon": "el-icon-user",
                                "orderNum": 2,
                                "open": 0,
                                "disabled": false,
                                "perms": null,
                                "type": 0,
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": 312,
                        "parentId": 0,
                        "menuName": "业务管理",
                        "url": null,
                        "icon": "el-icon-s-goods",
                        "orderNum": 3,
                        "open": 1,
                        "disabled": false,
                        "perms": null,
                        "type": 0,
                        "children": [
                            {
                                "id": 229,
                                "parentId": 312,
                                "menuName": "租赁业务管理",
                                "url": "",
                                "icon": "el-icon-date",
                                "orderNum": 1,
                                "open": 1,
                                "disabled": false,
                                "perms": "el-icon-date",
                                "type": 0,
                                "children": [
                                    {
                                        "id": 230,
                                        "parentId": 229,
                                        "menuName": "订单管理",
                                        "url": "/orderDetail",
                                        "icon": "el-icon-date",
                                        "orderNum": 1,
                                        "open": 0,
                                        "disabled": false,
                                        "perms": "el-icon-date",
                                        "type": 0,
                                        "children": []
                                    },
                                    {
                                        "id": 267,
                                        "parentId": 229,
                                        "menuName": "车辆续租",
                                        "url": "/products",
                                        "icon": "el-icon-goods",
                                        "orderNum": 2,
                                        "open": 0,
                                        "disabled": false,
                                        "perms": "",
                                        "type": 0,
                                        "children": []
                                    },
                                    {
                                        "id": 268,
                                        "parentId": 229,
                                        "menuName": "车辆入库",
                                        "url": "/productCategorys",
                                        "icon": "el-icon-star-off",
                                        "orderNum": 2,
                                        "open": 0,
                                        "disabled": false,
                                        "perms": "",
                                        "type": 0,
                                        "children": []
                                    },
                                    {
                                        "id": 270,
                                        "parentId": 229,
                                        "menuName": "车辆出库",
                                        "url": "/outStocks",
                                        "icon": "el-icon-goods",
                                        "orderNum": 5,
                                        "open": 0,
                                        "disabled": false,
                                        "perms": "",
                                        "type": 0,
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "id": 311,
                                "parentId": 312,
                                "menuName": "车辆服务管理",
                                "url": null,
                                "icon": "el-icon-edit",
                                "orderNum": 4,
                                "open": 1,
                                "disabled": false,
                                "perms": null,
                                "type": 0,
                                "children": [
                                    {
                                        "id": 310,
                                        "parentId": 311,
                                        "menuName": "事故管理",
                                        "url": "/consumers",
                                        "icon": "el-icon-edit",
                                        "orderNum": 1,
                                        "open": 0,
                                        "disabled": false,
                                        "perms": "",
                                        "type": 0,
                                        "children": []
                                    },
                                    {
                                        "id": 249,
                                        "parentId": 311,
                                        "menuName": "违章管理",
                                        "url": "/suppliers",
                                        "icon": "el-icon-coordinate",
                                        "orderNum": 5,
                                        "open": 0,
                                        "disabled": false,
                                        "perms": "",
                                        "type": 0,
                                        "children": []
                                    },
                                    {
                                        "id": 569,
                                        "parentId": 311,
                                        "menuName": "维修管理",
                                        "url": "/weizhang",
                                        "icon": "el-icon-coordinate",
                                        "orderNum": 5,
                                        "open": 0,
                                        "disabled": false,
                                        "perms": "",
                                        "type": 0,
                                        "children": []
                                    },
                                    {
                                        "id": 669,
                                        "parentId": 311,
                                        "menuName": "保养管理",
                                        "url": "/baoyan",
                                        "icon": "el-icon-coordinate",
                                        "orderNum": 5,
                                        "open": 0,
                                        "disabled": false,
                                        "perms": "",
                                        "type": 0,
                                        "children": []
                                    },
                                    {
                                        "id": 279,
                                        "parentId": 311,
                                        "menuName": "加油管理",
                                        "url": "/jiayou",
                                        "icon": "el-icon-coordinate",
                                        "orderNum": 5,
                                        "open": 0,
                                        "disabled": false,
                                        "perms": "",
                                        "type": 0,
                                        "children": []
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 303,
                        "parentId": 0,
                        "menuName": "车辆管理",
                        "url": "/car",
                        "icon": "el-icon-platform-eleme",
                        "orderNum": 5,
                        "open": 0,
                        "disabled": false,
                        "perms": "",
                        "type": 0,
                        "children": []
                    },
                    {
                        "id": 295,
                        "parentId": 0,
                        "menuName": "财务管理",
                        "url": "",
                        "icon": "el-icon-s-marketing",
                        "orderNum": 6,
                        "open": 1,
                        "disabled": false,
                        "perms": "",
                        "type": 0,
                        "children": [
                            {
                                "id": 341,
                                "parentId": 295,
                                "menuName": "账单管理",
                                "url": "/blog",
                                "icon": "el-icon-view",
                                "orderNum": 1,
                                "open": 0,
                                "disabled": false,
                                "perms": "",
                                "type": 0,
                                "children": []
                            },
                            {
                                "id": 296,
                                "parentId": 295,
                                "menuName": "发票开具",
                                "url": "/swagger",
                                "icon": "el-icon-document",
                                "orderNum": 2,
                                "open": 0,
                                "disabled": false,
                                "perms": null,
                                "type": 0,
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": 5,
                        "parentId": 0,
                        "menuName": "日志管理",
                        "url": "/logs",
                        "icon": "el-icon-camera",
                        "orderNum": 7,
                        "open": 1,
                        "disabled": false,
                        "perms": null,
                        "type": 0,
                        "children": [
                            {
                                "id": 271,
                                "parentId": 5,
                                "menuName": "登入日志",
                                "url": "/loginLog",
                                "icon": "el-icon-date",
                                "orderNum": 1,
                                "open": 0,
                                "disabled": false,
                                "perms": "login:log",
                                "type": 0,
                                "children": []
                            },
                            {
                                "id": 307,
                                "parentId": 5,
                                "menuName": "操作日志",
                                "url": "/logs",
                                "icon": "el-icon-edit",
                                "orderNum": 1,
                                "open": 1,
                                "disabled": false,
                                "perms": "",
                                "type": 0,
                                "children": []
                            }
                        ]
                    }
                ]
            }
        },
        components:{
          MenuTree
        },
        methods:{
            toggleCollapse(){
                this.isCollapse = !this.isCollapse;
            },logout(){
                const _this = this
                this.$axios.get("/logout",{
                    headers:{
                        "Authorization":localStorage.getItem("token")
                    }
                }).then(res=>{
                    _this.$store.commit("REMOVE_INFO")
                    _this.$router.push("/login")
                })
            }
        },created() {
            if(this.$store.getters.getUser.name){
                this.user.name = this.$store.getters.getUser.name
                this.user.role = this.$store.getters.getUser.role
                this.hasLogin = true
            }
            if(this.user.role == 'e'){
                this.menuList[0].disabled=true;
            }

        }
    }
</script>

<style lang="less" scoped>
    /*整个容器的高度*/
    .main_container{
        height: 100%;
    }
    /*头部布局*/
    .el-header {
        background-color: #408cff;
        display: flex;
        justify-content: space-between;
        padding-left: 0;
        color: #FFFFFF;
        align-items: center;
        font-size: 20px;
        /*左边*/
        .left_box{
            display: flex;
            align-items: center;
            span{
                margin-left: 15px;
            }
        }

    }
    /*侧边栏*/
    .el-aside {
        background-color: #FFFFFF;
        .el-menu{
            border-right: none;
        }
        /*展开/收起*/
        .toggle_box{
            cursor:pointer;
            color: #909399;
            font-size: 25px;
            font-weight: bold;
            line-height: 24px;
            text-align: center;
        }
    }

    /*主体*/
    .el-main {
        background-color: #E9EEF3;
    }

    /*下拉菜单*/
    .el-dropdown-link {
        cursor: pointer;
        color: #FFFFFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }

</style>