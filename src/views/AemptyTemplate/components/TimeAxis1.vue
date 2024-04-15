<template>
  <div :class="['timeline_area', { is_vertical: is_vertical }]">
    <div
      class="timeline_area_item"
      v-for="(item, index) in timelineList"
      :key="index"
    >
      <div class="out_circle">
        <div :class="['in_circle', { arrived: item.id }]"></div>
      </div>
      <div :class="['in_line', { step_line: item.id }]">
        <div
          :class="[
            'line_content',
            is_invert ? (isEven(index) ? 'is_bottom' : 'is_top') : '',
          ]"
        >
          <div class="timeline_content_date">{{ item.date }}</div>
          <div class="timeline_content_title">{{ item.title }}</div>
          <div class="timeline_content_desc">{{ item.content }}</div>
        </div>
      </div>
      <div class="out_circle" v-if="timelineList.length - 1 == index">
        <div :class="['in_circle', { arrived: item.id }]"></div>
      </div>
    </div>
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
    // 是否上下排列
    is_invert: {
      type: Boolean,
      default: false,
    },
    // 是否水平
    is_vertical: {
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
@import "@/styles/mixin.scss";
.timeline_area {
  @include df_ac;
  height: 100px;
  &_item {
    @include df_ac;
    .out_circle {
      --size: 16px;
      width: var(--size);
      height: var(--size);
      border-radius: 50%;
      position: relative;
      background: #e5f1fc;
      cursor: pointer;
    }
    .in_circle {
      --size: 8px;
      width: var(--size);
      height: var(--size);
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      top: 0;
      margin: auto;
      display: block;
      border-radius: 50%;
      box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
      background: #fff;
    }
    .in_line {
      width: 150px;
      height: 3px;
      background: #e5f1fc;
      position: relative;
      .line_content {
        position: absolute;
        bottom: 10px;
        left: 0;
        right: 0;
        margin: auto;
        text-align: center;
      }
    }
    .in_line.step_line {
      background: linear-gradient(to right, #1c78ea 100%, #8a8f8d 50%);
    }

    .in_circle.arrived {
      background: rgba(14, 116, 218, 1);
    }
    .line_content.is_bottom {
      bottom: 10px;
      left: 0;
      right: 0;
    }
    .line_content.is_top {
      top: 10px;
      left: 0;
      right: 0;
    }
  }
}
.is_vertical {
  @include df_fc;
  .timeline_area_item {
    @include df_fc;
    .in_line {
      width: 3px;
      height: 150px;
      .line_content {
        bottom: 0;
        width: 500px;
        padding-left: 20px;
        line-height: 1.5;
        height: 150px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: left;
      }
    }
  }
}
</style>
