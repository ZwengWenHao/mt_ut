<template>
  <div class="form-container">
    <formButton />
    <formView
      :dataList.sync="dataList"
      :blockIndex.sync="blockIndex"
      :chooseRow.sync="chooseRow"
      :modelInfo.sync="modelInfo"
    />
    <formInfo
      :chooseRow.sync="chooseRow"
      :modelInfo.sync="modelInfo"
      :chooseBlock="dataList[blockIndex]"
      @deleteBlock="deleteBlock"
    />
  </div>
</template>
<script>
import formButton from "./formButton/index.vue";
import formView from "./formView/index.vue";
import formInfo from "./formInfo/index.vue";
export default {
  components: {
    formButton,
    formView,
    formInfo,
  },
  data() {
    return {
      dataList: [],
      blockIndex: 0,
      chooseRow: {},
      modelInfo: {
        name: "",
      },
    };
  },
  methods: {
    deleteBlock() {
      this.dataList.splice(this.blockIndex, 1);
    },
  },
};
</script>
