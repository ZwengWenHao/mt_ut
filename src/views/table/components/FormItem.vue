<template>
  <el-form-item label="自定义字段">
    <el-select
      style="width: 300px"
      v-model="current"
      @change="handleSelect"
      multiple
      placeholder="动态表格字段控制"
    >
      <el-option
        v-for="item in options"
        :key="item"
        :label="item"
        :value="item"
      >
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
export default {
  data() {
    return {
      current: [],
      options: ["age", "sex", "hobby"],
    };
  },
  mounted() {
    this.$emit("handleSelect", this.current);
  },
  methods: {
    handleSelect() {
      this.$emit("handleSelect", this.current);
    },
  },
};
</script>

<style lang="scss"></style>
