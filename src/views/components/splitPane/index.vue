<template>
  <div class="split_pane">
    <CollapsePanel :collapseText="collapseText">
      <TextDescription @viewTutorial="viewTutorial">
        <ViewPath
          link="https://github.com/PanJiaChen/vue-split-pane"
        ></ViewPath>
      </TextDescription>
      <ExplainText :code="codeText"></ExplainText>
    </CollapsePanel>
    <SplitPane
      @resize="resize"
      :min-percent="20"
      :default-percent="30"
      split="vertical"
    >
      <template slot="paneL">
        <div class="paneL"></div>
      </template>
      <template slot="paneR">
        <SplitPane
          @resize="resize"
          :min-percent="20"
          :default-percent="30"
          split="horizontal"
        >
          <template slot="paneL">
            <div class="paneR"></div>
          </template>
          <template slot="paneR">
            <div class="paneRr"></div>
          </template>
        </SplitPane>
      </template>
    </SplitPane>
    <CodeDrawer ref="codeDrawer" :description="textDescription" />
  </div>
</template>
  
  <script>
import { codeContent } from "./codeTemplate";
export default {
  data() {
    return {
      codeText: "yarn add vue-splitpane ",
      textDescription: codeContent(),
      collapseText: " Split-Pane组件，可以垂直或水平分割",
    };
  },
  methods: {
    resize() {},
    viewTutorial() {
      this.$refs.codeDrawer.open();
    },
  },
};
</script>
  
  <style lang="scss" scoped>
.split_pane {
  height: calc(100vh - 84px);
  padding: 10px;

  .paneL {
    background-color: #01b7ec;
    height: 100%;
    width: 100%;
  }

  .paneR {
    background-color: pink;
    height: 100%;
    width: 100%;
  }
  .paneRr {
    background-color: aquamarine;
    height: 100%;
    width: 100%;
  }
}

.el-card__body {
  padding: 10px;
  border-radius: 4px;
}
</style>