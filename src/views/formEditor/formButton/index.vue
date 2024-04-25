<template>
  <div class="form-button">
    <div class="form-button__title">常用组件</div>
    <draggable
      v-model="commonType"
      :group="group"
      :move="handelMove"
      :clone="handelClone"
    >
      <transition-group class="form-button__warpper">
        <el-button
          v-for="item in commonType"
          :key="item.code"
          class="form-button__item"
        >
          {{ item.label }}
        </el-button>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import commonType from "./index";
import { deepClone } from "@/utils/index";
export default {
  data() {
    return {
      commonType: commonType,
    };
  },
  computed: {
    group() {
      return {
        name: "buildView",
        pull: "clone",
        put: false,
      };
    },
  },
  methods: {
    handelMove(evt) {
      if (evt.to.className !== "form-view__group") return false
    },
    handelClone(row) {
      const value = deepClone(row);
      const id = value.code + "_" + new Date().getTime();
      return {
        ...value,
        id,
      };
    },
  },
};
</script>
