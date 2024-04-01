<template>
  <PageHeaderForm>
    <el-form-item label="多选可拖动">
      <DragSelect />
    </el-form-item>
  </PageHeaderForm>
</template>

<script>
import DragSelect from "./components/DragSelect.vue";
export default {
  components: { DragSelect },
};
</script>

<style>
</style>