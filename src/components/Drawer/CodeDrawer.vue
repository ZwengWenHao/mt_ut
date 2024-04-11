<template>
  <el-drawer
    title="使用说明"
    :visible.sync="drawer"
    :direction="direction"
    :before-close="handleClose"
    :size="is_grow ? '61%' : '50%'"
    :withHeader="false"
  >
    <ExplainText :is_copy="false" :code="description"></ExplainText>
  </el-drawer>
</template>

<script>
export default {
  name: "CodeDrawer",
  props: {
    description: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      drawer: false,
      direction: "rtl",
      is_grow: false,
    };
  },
  beforeMount() {
    window.addEventListener("resize", this.Mobile);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.Mobile);
  },
  methods: {
    Mobile() {
      const WIDTH = 1426;
      const { body } = document;
      const rect = body.getBoundingClientRect();
      this.is_grow = rect.width - 1 < WIDTH;
    },
    open() {
      this.drawer = true;
    },
    handleClose() {
      this.drawer = false;
    },
  },
};
</script>

<style></style>
