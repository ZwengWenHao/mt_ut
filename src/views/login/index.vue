<template>
  <div class="login">
    <el-form
      ref="formData"
      :model="formData"
      :rules="rules"
      label-width="0px"
      class="login_box"
    >
      <h1 class="login_title">登录</h1>
      <el-form-item prop="username">
        <el-input
          v-model="formData.username"
          auto-complete="off"
          placeholder="用户"
        >
          <i slot="prefix" class="el-icon-user-solid"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="formData.password"
          auto-complete="off"
          placeholder="密码"
          show-password
        >
          <i slot="prefix" class="el-icon-s-order"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          placeholder="验证码"
          style="width: 67%"
          v-model="formData.code"
        >
          <i slot="prefix" class="el-icon-mobile-phone"></i>
        </el-input>
        <div class="login_code">
          <img :src="codeUrl" alt="" @click="codeImage" />
        </div>
      </el-form-item>
      <el-checkbox style="margin: 0 0 22px 0" v-model="formData.rememberMe">
        记住我
      </el-checkbox>
      <el-form-item>
        <el-button style="width: 100%" type="primary" @click="onSubmit"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getCodeImg } from "@/api/login";
import { encrypt } from "@/utils/rsaEncrypt";
import Cookies from "js-cookie";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      formData: {
        username: "admin",
        password: "123456",
        code: "",
        uuid: "",
        rememberMe: false,
      },
      cookiePass: "",
      codeUrl: "",
      redirect: null,
      rules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" },
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" },
        ],
        code: [
          { required: true, trigger: "change", message: "验证码不能为空" },
        ],
      },
    };
  },
  watch: {
    $route: {
      handler(route) {
        const data = route.query;
        if (data && data.redirect) {
          this.redirect = data.redirect;
          delete data.redirect;
          if (JSON.stringify(data) !== "{}") {
            this.redirect =
              this.redirect +
              "&" +
              this.$qs.stringify(data, { indices: false });
          }
        }
      },
      immediate: true,
    },
  },
  mounted() {
    this.codeImage();
    this.getCookie();
  },
  methods: {
    ...mapActions({
      Login: "user/Login",
    }),
    async codeImage() {
      const { uuid, img } = await getCodeImg();
      this.codeUrl = img;
      this.formData.uuid = uuid;
    },
    onSubmit() {
      this.$refs.formData.validate((valid) => {
        const user = { ...this.formData };
        if (user.password !== this.cookiePass) {
          user.password = encrypt(user.password);
        }
        if (valid) {
          if (user.rememberMe) {
            Cookies.set("username", user.username);
            Cookies.set("password", user.password);
            Cookies.set("rememberMe", user.password);
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove("rememberMe");
          }
          this.Login(user)
            .then((_) => {
              console.log("ok");
              this.$router.push({ path: "/" || "/" });
            })
            .catch((error) => {
              console.log("112", error);
              this.codeImage();
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getCookie() {
      const username = Cookies.get("username");
      let password = Cookies.get("password");
      const rememberMe = Cookies.get("rememberMe");
      this.cookiePass = password === undefined ? "" : password;
      password = password === undefined ? this.formData.password : password;
      this.formData = {
        username: username === undefined ? this.formData.username : username,
        password,
        rememberMe: Boolean(rememberMe),
        code: "",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  width: 100vw;
  &_title {
    text-align: center;
  }
  &_box {
    width: 50%;
    height: 30%;
    position: absolute;
    inset: 0;
    margin: auto;
  }
  &_code {
    width: 33%;
    float: right;
    text-align: center;
    img {
      vertical-align: middle;
    }
  }
}
</style>
