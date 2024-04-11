<template>
  <GlobalContainer>
    <CollapsePanel collapseText="带有图像预览的拖放文件上传dropzone">
      <TextDescription @viewTutorial="viewTutorial">
        <ViewPath link="https://github.com/rowanwins/vue-dropzone" />
      </TextDescription>
      <ExplainText code="yarn add dropzone 或者 npm install vue2-dropzone" />
    </CollapsePanel>

    <div class="editor-container">
      <dropzone
        id="myVueDropzone"
        url="https://httpbin.org/post"
        @dropzone-removedFile="dropzoneR"
        @dropzone-success="dropzoneS"
      />
    </div>
    <CodeDrawer ref="codeDrawer" :description="codeContent()" />
  </GlobalContainer>
</template>

<script>
import Dropzone from "./components/Dropzone.vue";
import { codeContent } from "./codeTemplate";
export default {
  components: { Dropzone },
  data() {
    return {
      textDescription: codeContent(),
    };
  },
  methods: {
    codeContent,
    viewTutorial() {
      this.$refs.codeDrawer.open();
    },
    // 上传成功
    dropzoneS(file) {
      this.$message({ message: "上传成功", type: "success" });
    },
    // 删除
    dropzoneR(file) {
      this.$message({ message: "删除成功", type: "success" });
    },
  },
};
</script>
