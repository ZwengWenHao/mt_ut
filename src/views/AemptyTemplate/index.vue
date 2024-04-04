<template>
  <div class="container">
    <!-- 简单使用 -->
    <split-pane
      @resize="resize"
      :min-percent="10"
      :default-percent="30"
      split="vertical"
    >
      <template slot="paneL">
        <div class="paneL"></div>
      </template>
      <template slot="paneR">right content</template>
    </split-pane>
    <!-- 嵌套使用 -->
    <split-pane
      @resize="resize"
      :min-percent="10"
      :default-percent="30"
      split="vertical"
    >
      <template slot="paneL">left content</template>
      <template slot="paneR">
        <split-pane
          @resize="resize"
          :min-percent="10"
          :default-percent="30"
          split="horizontal"
        >
          <template slot="paneL">top content</template>
          <template slot="paneR">bottom content</template>
        </split-pane>
      </template>
    </split-pane>
  </div>
</template>

<script>
import splitPane from "vue-splitpane";
export default {
  componnets: { splitPane },
  methods: {
    resize() {},
  },
};
</script>
<style>
.container{
  height:100vh;
}
</style>
