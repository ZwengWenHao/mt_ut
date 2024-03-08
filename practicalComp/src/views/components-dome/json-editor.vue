<template>
  <div class="json-editor">
    <el-button @click="handleOpen">打开</el-button>
    <JsonEditor
      :visible.sync="jsonDrawerVisible"
      :json-str="JSON.stringify(formData)"
    ></JsonEditor>
  </div>
</template>

<script>
import JsonEditor from "../../components/JsonEditor/index.vue";
export default {
  components: { JsonEditor },
  data() {
    return {
      jsonDrawerVisible: false,
      formData: {
        fields: [
          {
            __config__: {
              label: "单行文本",
              labelWidth: null,
              showLabel: true,
              changeTag: true,
              tag: "el-input",
              tagIcon: "input",
              required: true,
              layout: "colFormItem",
              span: 24,
              document: "https://element.eleme.cn/#/zh-CN/component/input",
              regList: [
                {
                  pattern: "/^1(3|4|5|7|8|9)\\d{9}$/",
                  message: "手机号格式错误",
                },
              ],
            },
            __slot__: {
              prepend: "",
              append: "",
            },
            __vModel__: "mobile",
            placeholder: "请输入手机号",
            style: {
              width: "100%",
            },
            clearable: true,
            "prefix-icon": "el-icon-mobile",
            "suffix-icon": "",
            maxlength: 11,
            "show-word-limit": true,
            readonly: false,
            disabled: false,
          },
        ],
        formRef: "elForm",
        formModel: "formData",
        size: "medium",
        labelPosition: "right",
        labelWidth: 100,
        formRules: "rules",
        gutter: 15,
        disabled: false,
        span: 24,
        formBtns: true,
      },
    };
  },
  methods: {
    handleOpen() {
      this.jsonDrawerVisible = true;
    },
  },
};
</script>

<style></style>
