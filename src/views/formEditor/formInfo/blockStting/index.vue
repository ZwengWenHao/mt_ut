<template>
  <div class="xz-block__setting">
    <el-button type="text" class="xz-block__del" @click="handelDelBlock"
      >删除</el-button
    >
    <el-form inline>
      <el-form-item label="占位百分比">
        <el-input v-model="chooseBlock.occupyingWidth"></el-input>
      </el-form-item>
      <el-row>
        <el-form-item label="居中">
          <el-switch
            v-model="chooseBlock.isCenter"
            active-color="#13ce66"
            inactive-color="#6c6c6c"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="边框">
          <el-switch
            v-model="chooseBlock.isBorder"
            active-color="#13ce66"
            inactive-color="#6c6c6c"
          >
          </el-switch>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  computed: {
    chooseBlock() {
      return this.$attrs.chooseBlock || {};
    },
  },
  methods: {
    handelDelBlock() {
      this.$emit("deleteBlock");
    },
  },
};
</script>

<style lang="scss">
.xz-block__setting {
  .xz-block__del {
    color: red;
    font-size: 16px;
  }
}
</style>
