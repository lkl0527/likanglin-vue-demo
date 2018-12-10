<template>
  <div>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-row>
        <el-col :span="20">
          <div>
            <el-menu-item index="1">组织用户后台管理系统</el-menu-item>
          </div>
        </el-col>
        <el-col :span="2">
          <div>
            <el-menu-item index="2">欢迎你,{{loginUser.userName}}</el-menu-item>
          </div>
        </el-col>
        <el-col :span="2">
          <div>
            <el-menu-item index="3">
              <el-button @click="logout">退出</el-button>
            </el-menu-item>
          </div>
        </el-col>
      </el-row>
    </el-menu>

    <el-container style="border: 1px solid #eee">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>菜单</span>
          </template>
          <el-menu-item-group>
            <template slot="title">
              <el-menu-item @click="toUser()" index="1">用户管理</el-menu-item>
            </template>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">
              <el-menu-item @click="toOrga()" index="2">组织管理</el-menu-item>
            </template>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>

      <el-container class="main">
        <el-main>
          <div>
            <User v-if="showUsers"></User>
          </div>
          <div>
            <Orga v-if="showOrgas"></Orga>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

  import User from '@/views/user/User'
  import Orga from '@/views/org/Orga'

  export default {
    name: 'Welcome',
    components: {
      User,
      Orga
    },
    data() {
      return {
        loginUser: '',
        showUsers: true,
        showOrgas: false,
      };
    },
    methods: {
      logout() {
        this.http(this, 'delete', this.api.user.logoutUser).then(() => {
          this.$notify({
            title: '成功',
            message: '退出成功',
            type: 'success'
          });
          //调用window删除localStorage中的数据
          window.localStorage.removeItem('loginUser');
          //设置跳转时间,跳转到主页面
          setTimeout(() => {
            this.$router.push('/');
          }, 1000);
        })
      },
      toUser() {
        this.showUsers = true
        this.showOrgas = false
      },
      toOrga() {
        this.showUsers = false
        this.showOrgas = true
      }
    },
    created() {
      var user = window.localStorage.getItem('loginUser');
      if (user && user.length > 0) {
        user = JSON.parse(user);
        if (user && user.userId > 0) {
          this.loginUser = user;
        } else {
          this.$router.push('/');
        }
      } else {
        this.$router.push('/');
      }
    }
  }
</script>

<style>
  html, body {
    width: 100%;
    height: 100%;
    background: url(../assets/login.jpg) no-repeat;
    background-size: 100% 100%;
  }
  .main {
    width: 1200px;
    height: 888px;
    background: #ffffff;
    background-size: 100% 100%;
  }
</style>
