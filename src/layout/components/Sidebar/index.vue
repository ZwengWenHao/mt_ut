<template>
  <div :class="['sidebar', { 'has-logo': isLogo }]">
    <Logo v-if="isLogo" :collapse="collapse" />
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
      <SidebarItem v-for="item in sidebarRouters" :key="item.path" :item="item" :base-path="item.path"></SidebarItem>
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
  computed: {
    ...mapState({
      isLogo: (state) => state.settings.sidebarLogo,
    }),
    ...mapGetters(["sidebar", "sidebarRouters"]),
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
      return this.sidebar.opened;
    },
  },
};
</script>

<style lang="scss">
.sidebar {
  width: 205px;
  background: #293a4b;
}

.scrollbar_wrap {
  overflow-x: hidden !important;
}

.has-logo {
  .el-scrollbar {
    height: calc(100% - 50px);
  }
}
</style>
