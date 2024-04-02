<template>
  <div :class="classObj" class="app_wrap">
    <Sidebar class="sidebar-container"></Sidebar>
    <div :class="['main_container', sidebar.opened ? 'hideSidebar' : '']">
      <div class="fixed-header" :style="{ width: headerWidth }">
        <Navbar />
        <TagsView />
      </div>
      <AppMain />
    </div>
  </div>
</template>

<script>
import ResizeHandler from './mixin/ResizeHandler'
import { Local } from "@/utils/storage";
import { mapGetters, mapActions } from "vuex";
import { Sidebar, AppMain, TagsView, Navbar } from "./components";
export default {
  components: {
    Sidebar,
    AppMain,
    TagsView,
    Navbar,
  },
  mixins:[ResizeHandler],
  computed: {
    ...mapGetters(["sidebar",'device']),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
      };
    },
    headerWidth() {
      return !this.sidebar.opened ? "calc(100% - 54px)" : "calc(100% - 250px)";
    },
  },
  methods:{
    ...mapActions({
      closeSideBar:'app/closeSideBar',
      toggleDevice:'app/toggleDevice',
      showSideBar:'app/showSideBar'
    })
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  transition: width 0.28s;
  background: #fff;
}
</style>
