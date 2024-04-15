<template>
  <div class="timeline_area">
    <div
      class="timeline_area_item"
      v-for="(item, index) in timelineList"
      :key="index"
    ></div>
  </div>
</template>
<script>
export default {
  name: "Timeline",
  props: {
    timelineList: {
      type: Array,
      default: () => [],
    },
    is_invert: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    isEven(index) {
      return index % 2 === 0;
    },
  },
};
</script>
<style lang="scss" scoped>
.timeline_area {
  display: flex;
  align-items: center;
  height: 100px;
}
</style>
