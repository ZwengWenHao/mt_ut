<!-- https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE -->
<template>
  <div :class="['prism_container', !is_copy ? 'prism_container_is_copy' : '']">
    <PrismEditor
      class="prism_editor"
      v-model="codeText"
      :highlight="highlighter"
      :line-numbers="lineNumbers"
    />
    <TooltipText content="复制">
      <el-button
        v-if="is_copy"
        class="prism_editor_copy_btn"
        plain
        icon="el-icon-copy-document"
        @click="copyTextClipboard({ copyText: codeText })"
      ></el-button>
    </TooltipText>
    <div v-if="!is_copy" class="copy_code" @click="cpText(codeText)">
      复制代码
    </div>
  </div>
</template>

<script>
import { copyTextClipboard, cpText } from "@/utils/clipboard";
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css";

import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";

export default {
  name: "ExplainText",
  components: {
    PrismEditor,
  },
  props: {
    code: {
      type: String,
      default: "",
    },
    is_copy: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    codeText() {
      return this.code;
    },
  },
  data: () => ({
    lineNumbers: false, // true为编辑模式， false只展示不可编辑
  }),
  methods: {
    copyTextClipboard,
    cpText,
    highlighter(code) {
      return highlight(code, languages.js); // returns html
    },
  },
};
</script>

<style lang="scss">
//  required class css样式必写，不然编辑器没有样式，只是纯白页面展示
.prism_container {
  display: flex;
  align-items: center;
  gap: 3px;
  margin: 5px 0;
  position: relative;
  .prism_editor {
    background: #2d2d2d;
    color: #ccc;
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    padding: 8px 10px;
    &_copy_btn {
      padding: 10px 10px;
    }
  }
  .prism-editor__textarea:focus {
    outline: none;
  }
  .prism_editor_copy {
    display: block;
    width: 50px;
    height: auto;
    font-size: 25px;
    cursor: pointer;
  }
  .copy_code {
    position: absolute;
    top: 0.8em;
    right: 15px;
    color: hsla(0, 0%, 54.9%, 0.8);
    text-align: center;
    font-size: 12px;
    cursor: pointer;
  }
  .copy_code:hover {
    color: #67686a;
  }
}
.prism_container.prism_container_is_copy {
  margin: 5px !important;
  .prism_editor {
    padding: 1.25rem 1.5rem;
  }
}
</style>
