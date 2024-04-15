<template>
  <div class="box">
    <div class="left">
      <CategoryGroup :current.sync="current" />
      <TimeAxis2
        :is_invert="getCurrent(current, 'invert')"
        :is_vertical="getCurrent(current, 'vertical')"
        :timelineList="timelineList"
       />
    </div>
    <TimeAxis1 class="right" :timelineList="timelineList3" />
  </div>
</template>

<script>
import { CategoryGroup, TimeAxis1, TimeAxis2 } from "./components/index";
import { generateRandomId } from "@/utils/random";
import moment from "moment";
export default {
  name: "",
  components: { TimeAxis1, TimeAxis2, CategoryGroup },
  data() {
    return {
      current: "default",
      list: ["default", "invert", "vertical"],
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
.box {
  height: 100%;
  padding: 20px;
  display: flex;
  box-sizing: border-box;
  .left {
    width: 50%;
  }
  .right {
    width: 50%;
  }
}
</style>
