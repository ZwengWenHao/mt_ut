<template>
  <GlobalContainer class="schedule_container" ref="container">
    <div class="left" data-drop="move">
      <div
        data-effect="copy"
        :draggable="true"
        class="curriculum"
        :style="{ background: randomHexColor() }"
        v-for="(item, index) in curriculum"
        :key="index"
      >
        {{ item }}
      </div>
    </div>
    <div class="right">
      <table>
        <thead>
          <tr>
            <td></td>
            <td>星期一</td>
            <td>星期二</td>
            <td>星期三</td>
            <td>星期四</td>
            <td>星期五</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th rowspan="4">上午</th>
            <td data-drop="copy" v-for="item in 5" :key="item"></td>
          </tr>
          <tr v-for="item in 3" :key="item">
            <td data-drop="copy" v-for="ele in 5" :key="ele"></td>
          </tr>
          <tr>
            <th rowspan="4">下午</th>
            <td data-drop="copy" v-for="item in 5" :key="item"></td>
          </tr>
          <tr v-for="item in 3" :key="item">
            <td data-drop="copy" v-for="ele in 5" :key="ele"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </GlobalContainer>
</template>

<script>
import { randomHexColor } from "@/utils/random";
export default {
  data() {
    return {
      curriculum: ["语文", "数学", "英语", "音乐", "政治", "历史", "体育"],
      source: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    randomHexColor,
    init() {
      const that = this;
      const container = this.$refs.container.$el;

      container.ondragstart = (v) => {
        v.dataTransfer.effectAllowed = v.target.dataset.effect;
        that.source = v.target;
      };

      // 拖拽在移动中事件
      container.ondragover = function (v) {
        v.preventDefault();
        // console.log(v);
      };

      // 拖拽进入容器事件
      container.ondragenter = function (v) {
        that.clearDropStyle();
        const dropNode = that.getDropNode(v.target);
        if (dropNode && dropNode.dataset.drop == v.dataTransfer.effectAllowed) {
          dropNode.classList.add("drop-over");
        }
      };

      // 拖拽进入并松手事件
      container.ondrop = function (v) {
        that.clearDropStyle();
        const dropNode = that.getDropNode(v.target);
        if (dropNode && dropNode.dataset.drop == v.dataTransfer.effectAllowed) {
          if (dropNode.dataset.drop === "copy") {
            const clond = that.source.cloneNode(true);
            dropNode.appendChild(clond);
          }
        }
      };
    },
    getDropNode(node) {
      while (node) {
        if (node.dataset.drop) {
          return node;
        }
        node = node.parentNode;
      }
    },
    clearDropStyle() {
      document.querySelectorAll(".drop-over").forEach((node) => {
        node.classList.remove("drop-over");
      });
    },
  },
};
</script>

<style lang="scss">
.schedule_container {
  display: flex;
  gap: 10px;
  .left {
    width: 80px;
  }
  .curriculum {
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    border-radius: 4px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .right {
    flex: 1;
    border: 1px solid #ccc;
    border-radius: 4px;
    table {
      width: 100%;
      height: 100%;
      colgroup {
        width: 100%;
        height: 100%;
      }
      thead > tr td {
        padding: 10px 5px;
      }
      tr,
      td,
      th {
        border: 1px solid #ccc;
        text-align: center;
        width: 80px;
        height: 30px;
      }
    }
  }
}
.drop-over {
  background: red;
}
</style>
