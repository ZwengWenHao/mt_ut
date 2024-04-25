<template>
  <div class="form-view" :style="formViewStyle">
    <h2 class="form-view__title">{{ modelInfo.name }}</h2>
    <div class="form-view__warpper">
      <div
        :class="[
          'form-view__box',
          { form_view_middle: item?.isCenter },
          { active: boxIndex == index },
        ]"
        @click="boxIndex = index"
        v-for="(item, index) in list"
        :key="index"
        :style="{
          width: (item?.occupyingWidth || 100) + '%',
          border: item?.isBorder ? '1px solid #333333' : '',
        }"
      >
        <draggable
          class="form-view__group"
          v-model="item.list"
          :group="group"
          :move="() => true"
        >
          <div
            :class="['form-view__group__item',{input_isLine:modelInfo.isLine}]"
            :style="{
              background: v.id == row.id ? '#f9f9f9' : '',
            }"
            v-for="v in item.list"
            @click="handelRow(v)"
            :key="v.id"
          >
            <component :is="v.code" :row="v" />
          </div>
        </draggable>
      </div>
    </div>
    <el-button class="form-view__add_button" @click="handleAdd"
      >添加区块</el-button
    >
  </div>
</template>

<script>
import componentLibrary from "./components/index";
export default {
  components: {
    ...componentLibrary,
  },
  props: {
    blockIndex: {
      type: Number,
      default: 0,
    },
    dataList: {
      type: Array,
      default: () => [],
    },
    chooseRow: {
      type: Object,
      default: () => {},
    },
    modelInfo: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    group() {
      return {
        name: "buildView",
        pull: false,
        put: true,
      };
    },
    formViewStyle() {
      const { leftPadding, rightPadding } = this.modelInfo;
      return {
        paddingLeft: (leftPadding || 0.2) + "%",
        paddingRight: (rightPadding || 0.2) + "%",
      };
    },
    list: {
      get() {
        return this.dataList;
      },
      set(val) {
        this.$emit("update:dataList", val);
      },
    },
    boxIndex: {
      get() {
        return this.blockIndex;
      },
      set(val) {
        this.$emit("update:blockIndex", val);
      },
    },
    row: {
      get() {
        return this.chooseRow;
      },
      set(val) {
        this.$emit("update:chooseRow", val);
      },
    },
  },
  methods: {
    handleAdd() {
      this.list.push({ list: [] });
    },
    handelRow(row) {
      this.row = row;
    },
  },
};
</script>
