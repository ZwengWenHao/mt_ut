<template>
  <div :class="{ 'has-logo': isLogo }">
    <Logo v-if="isLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar_wrap">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        background-color="#293a4b"
        text-color="#ffffff"
        active-text-color="red"
        :collapse-transition="false"
        unique-opened
        mode="vertical"
      >
        <SidebarItem
          v-for="item in permission_routers"
          :key="item.path"
          :item="item"
          :base-path="item.path"
        ></SidebarItem>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import SidebarItem from "./SidebarItem.vue";
import Logo from "./Logo.vue";
export default {
  components: {
    Logo,
    SidebarItem,
  },
  watch: {
    $route(route) {
      if (route.path.startsWith("/redirect/")) {
        return;
      }
      this.getBreadcrumb();
    },
  },
  computed: {
    ...mapState({
      isLogo: (state) => state.settings.sidebarLogo,
    }),
    ...mapGetters(["sidebar", "sidebarRouters", "permission_routers"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    collapse() {
      return true;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      );
      const first = matched[0];
      if (!this.isDashboard(first)) {
        matched = [{ path: "/dashboard", meta: { title: "首页" } }].concat(
          matched
        );
      }
    },
    isDashboard(route) {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return (
        name.trim().toLocaleLowerCase() === "Dashboard".toLocaleLowerCase()
      );
    },
  },
};
</script>

<style lang="scss">
.scrollbar_wrap {
  overflow-x: hidden !important;
}

.has-logo {
  .el-scrollbar {
    height: calc(100% - 50px);
  }
}
</style>
