<template>
  <div class="right_menu">
    <Search />
    <Screenfull />
    <Avatar />
  </div>
</template>

<script>
import { Search, Screenfull, Avatar } from "./RightMenu/index";
export default {
  components: {
    Search,
    Screenfull,
    Avatar
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style  lang="scss">
.right_menu {
  float: right;
  line-height: 50px;
  height: 100%;
}
</style>
