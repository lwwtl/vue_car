<template>
    <!--登录表单的容器-->
    <div class="login_container">
        <!--登录区域-->
        <div class="login_box">
        <!--头像-->
            <div class="avatar_box">
                <img src="../assets/img/timg.gif" >
            </div>
        <!--表单-->
            <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="0px" class="login_Form">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.account" prefix-icon="el-icon-user-solid" placeholder="帐号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" placeholder="密码"></el-input>
                </el-form-item>
<!--                <el-form-item prop="verifyCode">-->
<!--                    <div class="verifyCode_box">-->
<!--                    <el-input v-model="loginForm.verifyCode" prefix-icon="el-icon-key" class="verify_code" placeholder="验证码"></el-input>-->
<!--                    <img src="../assets/img/verifyCode.jpg" class="verifyCode_img">-->
<!--                    </div>-->
<!--                </el-form-item>-->

                <el-form-item class="login_btn">
                    <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                    <el-button @click="resetForm('loginForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        name:'Login',
        data() {
            return {
                loginForm: {
                    account: '',
                    password: '',
                    // verifyCode:''
                },
                loginRules: {
                    account: [
                        { required: true, message: '请输入帐号', trigger: 'blur' },
                        { min: 2, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
                    ],
                    verifyCode: [
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                        { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                const _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('login',this.loginForm).then((res)=>{
                            const token = res.headers['authorization']
                            _this.$store.commit('SET_TOKEN', token)
                            _this.$store.commit('SET_USERINFO', res.data.data)
                            _this.$router.push("/main")
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    };
</script>

<style lang="less" scoped>
    .login_container{
    height: 100%;
    background-color:aquamarine ;
    }
    .login_box{
        width: 450px;
        height: 380px;
        background-color: #FFFFFF;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
    .avatar_box{
        width: 130px;
        height: 130px;
        border: 1px solid #EEEEEE;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
        margin: -65px auto;
        background-color: #FFFFFF;
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #EEEEEE;
        }
    }
    .login_Form{
        position: absolute;
        width: 100%;
        bottom: 0;
        padding: 0 20px;
        box-sizing: border-box;
        .login_btn
        {
            display: flex;
            justify-content: flex-end;
        }
        .verifyCode_box{
            display: flex;
            .verify_code{
                width: 70%;
                justify-content: left;
            }
            .verifyCode_img{
                width: 30%;
                height: 45px;
                justify-content: flex-end;
            }
        }

    }

</style>
