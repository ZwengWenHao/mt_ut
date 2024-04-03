<template>
  <el-collapse>
    <CollapseItem v-bind="$attrs">
      <slot></slot>
    </CollapseItem>
  </el-collapse>
</template>

<script>
import CollapseItem from "./CollapseItem.vue";
export default {
  name: "CollapsePanel",
  components: { CollapseItem },
};
</script>

<style lang="scss">
.el-collapse {
  border: none;
  .el-collapse-item__header {
    padding: 10px;
  }
  .el-collapse-item__content {
    padding-bottom: 0;
  }
}
</style>