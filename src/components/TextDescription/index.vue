<template>
  <!-- 文本说明  is--否显示操作按钮  -->
  <div :class="['text_description_wrap', text ? 'is_mb' : '']">
    <el-card :class="['text_description', { text: text }]">
      <slot />
    </el-card>
    <TooltipText content="使用">
      <el-button
        v-if="!$attrs.is"
        class="text_description_btn"
        plain
        @click="viewTutorial"
      >
        <svg-icon icon-class="look"></svg-icon>
      </el-button>
    </TooltipText>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: Boolean,
      default: false,
    },
  },
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
    padding: 6px 10px;
    flex: 1;
    font-size: 15px;
    .el-card__body {
      padding: 0px;
    }
    a {
      color: #337ab7;
    }
  }
  .text_description.text {
    padding: 10px 10px;
  }

  .text_description_btn {
    padding: 10px 10px;
    height: auto;
    font-size: 16px;
    cursor: pointer;
  }
}
.text_description_wrap.is_mb {
  margin-bottom: 5px;
}
</style>
