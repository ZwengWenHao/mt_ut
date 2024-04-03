<template>
  <!-- tooltip 文字提示 -->
  <el-tooltip
    class="item"
    effect="dark"
    :content="$attrs.content"
    placement="top"
    :enterable="false"
  >
    <slot />
  </el-tooltip>
</template>
<script>
export default {
  name: "TooltipText",
};
</script>
