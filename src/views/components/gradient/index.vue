<template>
  <div class="gradient">
    <div class="gradient_item" v-for="(item, index) in compInfo" :key="index">
      <JvDivider>{{ item.title }}</JvDivider>
      <FrameCard :distance="item.value" :is_rolling="item.is_rolling" />
    </div>
  </div>
</template>

<script>
import { FrameCard, lattice } from "./components/index";
export default {
  components: {
    FrameCard,
    lattice,
  },
  data() {
    return {
      compInfo: [
        {
          title: "旋转速度为100",
          value: "100",
          is_rolling: true,
        },
        {
          title: "旋转速度为10",
          value: "10",
          is_rolling: true,
        },
        {
          title: "禁止旋转",
          value: "0",
          is_rolling: false,
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.gradient {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 10px;
  &_item {
    flex: 1;
  }
}
</style>
