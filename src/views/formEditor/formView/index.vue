<template>
  <div class="form-view">
    <h2 class="form-view__title">标题</h2>
    <div class="form-view__warpper">
      <div
        class="form-view__box"
        @click="handelBox(index)"
        v-for="(item, index) in dataList"
        :key="index"
        :style="{
          background: blockIndex == index ? 'var(--form-view-bg)' : '',
        }"
      >
        <draggable
          v-model="item.list"
          :group="group"
          :move="handelMove"
          class="form-view__group"
        >
          <div
            class="form-view__group__item"
            v-for="v in item.list"
            :key="v.id"
          >
            <component :is="v.code" />
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
  computed: {
    group() {
      return {
        name: "buildView",
        pull: false,
        put: true,
      };
    },
    dataList() {
      return this.$attrs.dataList;
    },
    blockIndex() {
      return this.$attrs.blockIndex;
    },
  },
  methods: {
    handelBox(index) {
      this.blockIndex = index;
    },
    handelMove() {},
    handleAdd() {
      this.dataList.push({ list: [] });
    },
  },
};
</script>
