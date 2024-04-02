<template>
  <el-link @click="openBrowserWindow(link)">
    {{title}} {{ link }}
  </el-link>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ViewPath",
  props: {
    link: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "查看文档",
    },
  },
  computed: {
    ...mapGetters(["isBrowserWindow"]),
  },
  methods: {
    ...mapActions({
      browserWindow: "app/browserWindow",
    }),
    // 打开的新窗口，未关闭的情况下，再次点击，呼出已经打开过的窗口
    openBrowserWindow(link) {
      if (this.isBrowserWindow && !this.isBrowserWindow.closed) {
        this.isBrowserWindow.focus();
      } else {
        const BrowserWindow = window.open(link);
        this.browserWindow(BrowserWindow);
      }
    },
  },
};
</script>