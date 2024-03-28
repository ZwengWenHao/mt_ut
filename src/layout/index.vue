<template>
  <div class="app_wrap">
    <Sidebar class="sidebar_container"></Sidebar>
    <div class="main_container">
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
    Navbar
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
</style>
