<template>
  <el-collapse>
    <CollapseItem v-bind="$attrs"></CollapseItem>
  </el-collapse>
</template>

<script>
import CollapseItem from "./CollapseItem.vue";
export default {
  name: "CollapsePanel",
  components: { CollapseItem },
};
</script>

<style>
</style>