<template>
  <div id="editorJson" class="json-editor" />
</template>

<script>
import { beautifierConf } from "@/utils/index";
import ClipboardJS from "clipboard";
import loadMonaco from "@/utils/loadMonaco";
import loadBeautifier from "@/utils/loadBeautifier";

let beautifier;
let monaco;

export default {
  components: {},
  props: {
    jsonStr: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {
    this.onOpen()
  },
  mounted() {
    window.addEventListener("keydown", this.preventDefaultSave);
    const clipboard = new ClipboardJS(".copy-json-btn", {
      text: (trigger) => {
        this.$notify({
          title: "成功",
          message: "代码已复制到剪切板，可粘贴。",
          type: "success",
        });
        return this.beautifierJson;
      },
    });
    clipboard.on("error", (e) => {
      this.$message.error("代码复制失败");
    });
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.preventDefaultSave);
  },
  methods: {
    preventDefaultSave(e) {
      if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
      }
    },
    onOpen() {
      loadBeautifier((btf) => {
        beautifier = btf;
        this.beautifierJson = beautifier.js(this.jsonStr, beautifierConf.js);
        console.log(this.beautifierJson);
        loadMonaco((val) => {
          monaco = val;
          this.setEditorValue("editorJson", this.beautifierJson);
        });
      });
    },
    onClose() {},
    setEditorValue(id, codeStr) {
      console.log("monaco", monaco);
      if (this.jsonEditor) {
        this.jsonEditor.setValue(codeStr);
      } else {
        this.jsonEditor = monaco.editor.create(document.getElementById(id), {
          value: codeStr,
          theme: "vs-dark",
          language: "json",
          automaticLayout: true,
        });
        // ctrl + s 刷新
        this.jsonEditor.onKeyDown((e) => {
          if (e.keyCode === 49 && (e.metaKey || e.ctrlKey)) {
            this.refresh();
          }
        });
      }
    },
    exportJsonFile() {
      this.$prompt("文件名:", "导出文件", {
        inputValue: `${+new Date()}.json`,
        closeOnClickModal: false,
        inputPlaceholder: "请输入文件名",
      }).then(({ value }) => {
        if (!value) value = `${+new Date()}.json`;
        const codeStr = this.jsonEditor.getValue();
        const blob = new Blob([codeStr], { type: "text/plain;charset=utf-8" });
        saveAs(blob, value);
      });
    },
    refresh() {
      try {
        this.$emit("refresh", JSON.parse(this.jsonEditor.getValue()));
      } catch (error) {
        this.$notify({
          title: "错误",
          message: "JSON格式错误，请检查",
          type: "error",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.editorJson {
  height: 100vh;
}
</style>
