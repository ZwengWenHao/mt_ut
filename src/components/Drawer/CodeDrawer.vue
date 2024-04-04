<template>
  <el-drawer
    title="使用说明"
    :visible.sync="drawer"
    :direction="direction"
    :before-close="handleClose"
    size="50%"
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
    };
  },
  methods: {
    open(code) {
      this.drawer = true;
    },
    handleClose() {
      this.drawer = false;
    },
  },
};
</script>

<style>
</style>