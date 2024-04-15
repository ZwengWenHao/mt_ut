<template>
  <el-radio-group v-model="value">
    <el-radio label="vertical">垂直布局</el-radio>
    <el-radio label="default">水平布局</el-radio>
    <el-radio label="invert">上下布局</el-radio>
  </el-radio-group>
</template>

<script>
export default {
  props: {
    current: {
      type: String,
      default: "",
    },
  },
  computed: {
    value: {
      get() {
        return this.current;
      },
      set(v) {
        this.$emit("update:current", v);
      },
    },
  },
};
</script>
