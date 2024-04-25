<template>
  <div class="form-container">
    <formButton />
    <formView
      :dataList="dataList"
      :blockIndex="blockIndex"
      :chooseRow="chooseRow"
      :modelInfo="modelInfo"
    />
    <formInfo />
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
      modelInfo: {},
    };
  },
};
</script>
