<template>
  <el-alert type="success" :closable="false">
    <span style="flex: 1">{{ rerDayContent.content || '今天你努力了吗'}}</span>
    <span style="float: right">{{ rerDayContent.from?`--${rerDayContent.from}`:'--少年' }}</span>
  </el-alert>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      rerDayContent: {},
    };
  },
  mounted() {
    this.oneWordPerDay();
  },
  methods: {
    async oneWordPerDay() {
      const { data } = await axios({
        url: process.env.NODE_ENV == 'production'?window.SITE_CONFIG['VUE_APP_BASE_API_yiyan']:"/text/yiyan.php",
      });
      this.rerDayContent = data;
    },
  },
};
</script>