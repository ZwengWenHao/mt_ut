<template>
  <div class="text_description_wrap">
    <el-card class="text_description">
      <slot />
    </el-card>
    <el-button class="text_description_btn" plain @click="viewTutorial"
      >使用说明</el-button
    >
  </div>
</template>

<script>
export default {
  name: "TextDescription",
  methods: {
    viewTutorial() {
      this.$emit("viewTutorial");
    },
  },
};
</script>

<style lang="scss">
.text_description_wrap {
  display: flex;
  align-items: center;
  gap: 3px;
  .text_description {
    padding: 8px 10px;
    flex: 1;
    .el-card__body {
      padding: 0px;
    }
    a {
      color: #337ab7;
    }
  }
  .text_description_btn {
    padding: 10px 10px;
    height: auto;
  }
}
</style>