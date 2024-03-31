<template>
  <div class="table_wrap">
    <PageHeaderForm>
      <FormItem @handleSelect="handleSelect" />
    </PageHeaderForm>
    <JvDivider>动态表格</JvDivider>
    <DynamicTable ref="dynamicTable" />
    <JvDivider>表格拖动排序</JvDivider>
    <DragTable />
  </div>
</template>

<script>
import * as comp from "./components/index";
export default {
  components: {
    ...comp,
  },
  data() {
    return {
      formThead: [],
    };
  },
  methods: {
    handleSelect(v) {
      this.$refs.dynamicTable.init(v);
      this.formThead = v;
    },
  },
};
</script>

<style>
.table_wrap {
  height: 100%;
  padding: 3px 5px;
  background: #f0f2f5;
}
</style>