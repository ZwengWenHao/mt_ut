<template>
  <div id="editorJson" class="json-editor" />
</template>

<script>
import { beautifierConf } from "@/utils/index";
import ClipboardJS from "clipboard";
import loadMonaco from "@/utils/loadMonaco";
import loadBeautifier from "@/utils/loadBeautifier";
import { Local } from "@/utils/storage";
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
  mounted() {
    this.onOpen()
    window.addEventListener("keydown", this.preventDefaultSave);
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
        loadMonaco((val) => {
          monaco = val;
          this.setEditorValue("editorJson", this.beautifierJson);
        });
      });
    },
    setEditorValue(id, codeStr) {
      if (this.jsonEditor) {
        this.jsonEditor.setValue(codeStr);
      } else {
        this.jsonEditor = monaco.editor.create(document.getElementById(id), {
          value: codeStr,
          theme: "vs-dark",
          language: "json",
          automaticLayout: true,
        });
        this.jsonEditor.onKeyDown((e) => {
          if (e.keyCode === 49 && (e.metaKey || e.ctrlKey)) {
            this.refresh();
          }
        });
      }
    },
    refresh() {
      const codeStr = this.jsonEditor.getValue();
      Local.set("permission", codeStr);
      this.$emit("refresh");
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-drawer__header {
  display: none;
}
.editorJson {
  height: 100vh;
}
</style>
