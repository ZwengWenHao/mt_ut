<template>
  <div class="form-info">
    <el-tabs class="form-info__tabs" type="border-card">
      <el-tab-pane label="模版">
        <templateSetting :modelInfo="modelInfo" />
      </el-tab-pane>
      <el-tab-pane label="控件">
        
      </el-tab-pane>
      <el-tab-pane label="区块">
        <blockSetting v-on="$listeners" :chooseBlock="chooseBlock" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import blockSetting from "./blockStting/index.vue";
import templateSetting from "./templateSetting/index.vue";
export default {
  components: {
    blockSetting,
    templateSetting,
  },
  computed: {
    chooseRow() {
      return this.$attrs.chooseRow;
    },
    modelInfo() {
      return this.$attrs.modelInfo;
    },
    chooseBlock() {
      return this.$attrs.chooseBlock;
    },
  },
};
</script>
