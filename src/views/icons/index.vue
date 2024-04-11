<template>
  <div class="icons_container">
    <TextDescription text> Icon图标与Svg两大图标 </TextDescription>
    <el-tabs tab-position="top" type="card">
      <el-tab-pane label="svgIcon">
        <div class="icons_container_box">
          <div
            class="grid_icon"
            v-for="(item, index) in svgIcons"
            :key="index"
            @click="cpText(generateIconCode(item))"
          >
            <el-tooltip placement="top">
              <div slot="content">
                {{ generateIconCode(item) }}
              </div>
              <div class="icon_item">
                <svg-icon :icon-class="item" class-name="disabled" />
                <span>{{ item }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="fontIcon">
        <div class="icons_container_box">
          <div
            class="grid_icon"
            v-for="(item, index) in elementIcons"
            :key="index"
            @click="cpText(generateElementIconCode(item))"
          >
            <el-tooltip placement="top">
              <div slot="content">
                {{ generateElementIconCode(item) }}
              </div>
              <div class="icon_item">
                <i :class="'el-icon-' + item" />
                <span>{{ item }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { cpText } from "@/utils/clipboard";
import svgIcons from "./svg-icons";
import elementIcons from "./element-icons";
export default {
  name: "",
  data() {
    return {
      svgIcons,
      elementIcons,
    };
  },
  methods: {
    cpText,
    generateIconCode(symbol) {
      return `<svg-icon icon-class="${symbol}" />`;
    },
    generateElementIconCode(symbol) {
      return `<i class="el-icon-${symbol}" />`;
    },
  },
};
</script>

<style lang="scss">
.icons_container {
  height: 100%;
  padding: 10px;
}
.icons_container_box {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0px;
  border: 1px solid #eaeefb;
  border-radius: 4px;
  .grid_icon {
    padding: 30px 5px;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    margin-right: -1px;
    margin-bottom: -1px;
    .icon_item {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      gap: 10px;
      color: #606266;
      span {
        font-size: 14px;
        color: #99a9bf;
      }
    }
    .icon_item:nth-child(1) {
      font-size: 23px;
      color: #606266;
    }
    .icon_item:hover .svg-icon,
    .icon_item:hover i,
    .icon_item:hover span {
      color: #73b4f9 !important;
    }
  }
}
</style>
