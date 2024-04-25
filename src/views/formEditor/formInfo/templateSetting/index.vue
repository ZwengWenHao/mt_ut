<template>
  <div class="template_setting">
    <el-form label-width="100px">
      <el-form-item label="名称">
        <el-select
          clearable
          style="width: 100%"
          v-model="templateName"
          placeholder="请选择"
          @change="handelTemplateInfo"
        >
          <el-option
            v-for="item in optionsName"
            :key="item.value"
            :label="item.label"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="编码">
        <el-input v-model="modelInfo.code" disabled></el-input>
      </el-form-item>
      <el-form-item label="必填">
        <el-switch
          v-model="modelInfo.required"
          :active-value="1"
          :inactive-value="0"
        ></el-switch>
      </el-form-item>
      <el-form-item label="左边距">
        <el-input v-model="modelInfo.leftPadding">
          <el-button slot="append">%</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="右边距">
        <el-input v-model="modelInfo.rightPadding">
          <el-button slot="append">%</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="输入框横线">
        <el-switch v-model="modelInfo.isLine"></el-switch>
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          v-model="modelInfo.remark"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 4 }"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      templateName: {},
      optionsName: [
        {
          label: "数据报表",
          value: "template1",
        },
        {
          label: "数据统计",
          value: "template2",
        },
      ],
    };
  },
  computed: {
    modelInfo() {
      return this.$attrs.modelInfo;
    },
  },
  methods: {
    handelTemplateInfo(v) {
      this.modelInfo.name = v.label;
      this.modelInfo.code = v.value;
    },
  },
};
</script>

<style lang="scss">
.template_setting {
  width: 100%;

  .el-form-item__label {
    text-align: left;
  }
}
</style>
