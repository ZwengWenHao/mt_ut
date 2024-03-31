<template>
  <Container>
    <el-dropdown
      class="avatar-container right-menu-item hover-effect"
      trigger="click"
    >
      <div class="avatar-wrapper">
        <img :src="avatarImg" class="user-avatar" />
        <i class="el-icon-caret-bottom" />
      </div>
      <el-dropdown-menu slot="dropdown">
        <span style="display: block" @click="open">
          <el-dropdown-item divided> 退出登录 </el-dropdown-item>
        </span>
      </el-dropdown-menu>
    </el-dropdown>
  </Container>
</template>

<script>
import Container from "./Container.vue";
import { mapActions } from "vuex";
export default {
  components: { Container },
  data() {
    return {
      iamges: [
        {
          url: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80",
        },
        {
          is_default: true,
          url: "https://live2d-widget-right.oss-cn-hangzhou.aliyuncs.com/avatar-ice-bear.svg",
        },
        {
          url: "https://pic1.zhimg.com/v2-20349f467724ccd7b4e353fb816f37e0_b.gif",
        },
      ],
    };
  },
  computed: {
    avatarImg() {
      return this.iamges.find((v) => v.is_default == true).url;
    },
  },
  methods: {
    ...mapActions({ LogOut: "user/LogOut" }),
    open() {
      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.LogOut().then((_) => {
          location.reload();
        });
      });
    },
  },
};
</script>

<style lang="scss">
.avatar-container {
  margin-right: 30px;

  .avatar-wrapper {
    margin-top: 5px;
    position: relative;

    .user-avatar {
      cursor: pointer;
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }

    .el-icon-caret-bottom {
      cursor: pointer;
      position: absolute;
      right: -20px;
      top: 25px;
      font-size: 12px;
    }
  }
}
</style>