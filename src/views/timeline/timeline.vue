<template>
  <div class="timeline_wrap_box">
    <CategoryGroup :current.sync="current" />
    <div class="timeline_wrap">
      <div class="timeline_wrap_left">
        <TimeAxis1
          :is_invert="getCurrent(current, 'invert')"
          :is_vertical="getCurrent(current, 'vertical')"
          :timelineList="timelineList"
        />
      </div>
      <TimeAxis2 class="right" :timelineList="timelineList3" />
    </div>
  </div>
</template>

<script>
import { CategoryGroup, TimeAxis1, TimeAxis2 } from "./components/index";
import { generateRandomId } from "@/utils/random";
import moment from "moment";
export default {
  components: { TimeAxis1, TimeAxis2, CategoryGroup },
  data() {
    return {
      current: "vertical",
      timelineList: [
        {
          id: generateRandomId(),
          date: moment().format("MM-DD"),
          content: "",
          title: "时间轴",
        },
        {
          id: generateRandomId(),
          date: moment().format("MM-DD"),
          content: "",
          title: "时间轴",
        },
        {
          id: generateRandomId(),
          date: moment().format("MM-DD"),
          content: "",
          title: "时间轴",
        },
        {
          id: generateRandomId(),
          date: "",
          content: "",
          title: "时间轴",
        },
      ],
      timelineList2: [
        {
          id: generateRandomId(),
          date: moment().format("MM-DD"),
          content: "",
          title: "时间轴",
        },
        {
          id: generateRandomId(),
          date: moment().format("MM-DD"),
          content: "",
          title: "时间轴",
        },
        {
          id: "",
          date: "",
          content: "",
          title: "",
        },
        {
          id: "",
          date: "",
          content: "",
          title: "",
        },
      ],
      timelineList3: [
        {
          id: generateRandomId(),
          date: moment().format("YYYY-MM-DD"),
          content: "时间轴是一个按时间顺序描述一系列事件的很好方式",
          title: "时间轴",
        },
        {
          id: generateRandomId(),
          date: moment().format("YYYY-MM-DD"),
          content: "时间轴是一个按时间顺序描述一系列事件的很好方式",
          title: "时间轴",
        },
        {
          id: generateRandomId(),
          date: moment().format("YYYY-MM-DD"),
          content: "时间轴是一个按时间顺序描述一系列事件的很好方式",
          title: "时间轴",
        },
        {
          id: generateRandomId(),
          date: moment().format("YYYY-MM-DD"),
          content: "时间轴是一个按时间顺序描述一系列事件的很好方式",
          title: "时间轴",
        },
      ],
    };
  },
  computed: {
    getCurrent() {
      return function (v, type) {
        if (v === "default") {
          return false;
        } else if (v === type) {
          return true;
        }
      };
    },
  },
};
</script>
<style lang="scss">
.timeline_wrap_box {
  padding: 10px;

  .timeline_wrap {
    height: 100%;
    display: flex;
    &_left {
      width: 50%;
    }
    &_right {
      width: 50%;
    }
  }
}
</style>
