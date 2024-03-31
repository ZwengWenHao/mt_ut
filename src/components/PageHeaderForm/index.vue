<template>
  <el-form inline class="form_container">
    <slot></slot>
  </el-form>
</template>
<script>
export default {
  name: "PageHeaderForm",
};
</script>


<style lang="scss">
.form_container {
  padding: 10px 10px;
  background: #ffffff;
  border-radius: 4px;
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
