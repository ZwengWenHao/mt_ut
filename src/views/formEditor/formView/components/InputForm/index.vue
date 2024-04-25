<template>
  <div class="xz-form">
    <span class="xz-form__label">{{ rowInfo.label }}</span>
    <el-input clear="xz-form__warpper" v-model="rowInfo.value"></el-input>
    <span class="xz-form__suffix">{{ rowInfo.suffix }}</span>
  </div>
</template>

<script>
export default {
  props: {
    row: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    rowInfo: {
      get() {
        return this.row;
      },
      set(val) {
        this.$emit("update:rowInfo", val);
      },
    },
  },
  name: "inputForm",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss">
.xz-form {
  width: 100%;
  display: flex;
  align-items: center;
  height: 100%;
  vertical-align: middle;
  padding: 5px 10px;
  &__label {
    margin-right: 5px;
    width: auto;
    flex-shrink: 0;
  }
  &__warpper {
    display: inline-block;
    flex: 1;
  }
  &__suffix {
    margin-left: 10px;
  }
}
.el-input.is-active .el-input__inner,
.el-input__inner:focus {
  border-color: #e4e7ed;
}
.el-input__inner {
  border: 1px solid #e4e7ed;
}
</style>
