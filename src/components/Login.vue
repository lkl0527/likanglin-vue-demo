<template>
  <div>
    <el-card style="margin: 100px 500px ;background-color:#112e75" class="index">
      <el-form :model="formParams" style="width: 100%" class="loginUser">
        <h3 class="title">系统登录</h3>
        <el-card style="margin: 10px 230px ;background-color:#112e75;border-color: #112e75">
          <el-form-item prop="username">
            <td>
              <h3 style="font-family: Calibri;color:white;">用户名:</h3>
            </td>
            <td>
              <el-input v-model="formParams.username" placeholder="用户名"></el-input>
            </td>
          </el-form-item>

          <el-form-item prop="password">
            <td>
              <h3 style="font-family: Calibri;color:white">密码:</h3>
            </td>
            <td>
              <el-input v-model="formParams.password" type="password" placeholder="密码"></el-input>
            </td>
          </el-form-item>
        </el-card>
        <el-form-item>
          <el-button type="primary" @click="doLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>

  import ElCard from "element-ui/packages/card/src/main";

  export default {
    components: {ElCard},
    name: 'Login',
    data() {
      return {
        //定义表单数据
        formParams: {
          //定义表单数据
          username: '',
          password: ''
        },
      };
    },
    /**
     * 界面所有的操作方法
     */
    methods: {
      /**
       * 用户登录方法
       */
      doLogin() {
        if (this.formParams.username === '') {
          this.$message({
            message: '请输入用户名',
            type: 'info'
          })
          return
        }
        if (this.formParams.password === '') {
          this.$message({
            message: '请输入密码',
            type: 'info'
          })
          return
        }
        var user = {
          userName: this.formParams.username,
          userPassword: this.formParams.password
        }
        /**
         * 调用后端的登录方法
         */
        this.http(this, 'post', this.api.user.loginUser, user).then((data) => {
          this.$notify({
            title: '成功',
            message: '恭喜您,登录成功,跳转中...',
            type: 'success'
          });
          //将用户信息存储在localSorage中
          window.localStorage.setItem('loginUser', JSON.stringify(data));
          //设置跳转时间
          setTimeout(() => {
            this.$router.push('/index');
          }, 1000)
        });
      }
    }
  }
</script>

<style>
  .loginUser {
    align-content: center;
    height: 40px;
    width: 400px;
    background: #519fff;
  }

  .index {
    width: 800px;
    height: 400px;

  }

</style>
