<template>
  <div class="split_pane">
    <CollapsePanel :title.sync="textDescription">
      <TextDescription @viewTutorial="viewTutorial">
        <ViewPath
          link="https://github.com/PanJiaChen/vue-split-pane"
        ></ViewPath>
      </TextDescription>
    </CollapsePanel>

    <ExplainText :code="codeText"></ExplainText>
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
export default {
  data() {
    return {
      codeText: "yarn add vue-splitpane ",
      textDescription: "121",
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
  height: 100vh;
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