<template>
  <div class="divider_container">
    <el-divider>
      <span class="divider_container_text">
        <slot></slot>
      </span>
    </el-divider>
  </div>
</template>

<script>
export default {
  name: "JvDivider",
};
</script>

<style lang="scss">
.divider_container {
  padding: 1px 0;
  background: #ffffff;
  margin: 3px 0;
  border-radius: 4px;
  .el-divider--horizontal {
    margin: 15px 0;
  }
  &_text {
    background-image: -webkit-linear-gradient(bottom, red, pink, #4f34d2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>