<template>
  <!-- 动态表格 -->
  <div class="dynamic_table r4">
    <el-table
      :key="key"
      :data="tableData"
      border
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column prop="name" label="name"></el-table-column>
      <el-table-column v-for="fruit in formThead" :key="fruit" :label="fruit">
        <template slot-scope="scope">
          {{ scope.row[fruit] }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      key: 1,
      tableData: [
        {
          name: "Sofia Rodriguez",
          age: "24",
          sex: "男",
          hobby: "Rap",
        },
        {
          name: "Schmidt",
          age: "25",
          sex: "女",
          hobby: "Rapping and dancing",
        },
        {
          name: "Alexander",
          age: "24",
          sex: "女",
          hobby: "dancing",
        },
      ],
      formThead: [],
    };
  },
  watch: {
    formThead(v) {
      this.key = this.key + 1;
    },
  },
  methods: {
    init(v) {
      this.formThead = v;
    },
  },
};
</script>
