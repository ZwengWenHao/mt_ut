<template>
  <div :class="classObj" class="app_wrap">
    <Sidebar class="sidebar-container"></Sidebar>
    <div :class="['main_container', { hideSidebar: sidebar.opened }]">
      <Navbar />
      <TagsView />
      <AppMain></AppMain>
    </div>
  </div>
</template>

<script>
import { Local } from "@/utils/storage";
import { mapGetters } from "vuex";
import { Sidebar, AppMain, TagsView, Navbar } from "./components";
export default {
  components: {
    Sidebar,
    AppMain,
    TagsView,
    Navbar,
  },
  computed: {
    ...mapGetters(["sidebar"]),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
      };
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.app_wrap {
  display: flex;
}

.main_container {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.hideSidebar {
  .sidebar-container {
    width: 54px !important;
  }
  .main-container {
    margin-left: 54px !important;
  }
}
</style>
