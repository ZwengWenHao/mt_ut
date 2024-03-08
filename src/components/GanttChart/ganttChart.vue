<template>
  <div id="echartsIdQuery" ref="echartsRef"></div>
</template>
<script>
import * as echarts from "echarts";
import moment from "moment";
import throttle from "lodash/throttle";
export default {
  name: "GanttChart",
  props: {
    showName: {
      type: Array,
      default: () => [],
    },
    formData: {
      type: Object,
      default: () => {},
    },
    colorInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      myChart: null,
      data: [],
      categories: [],
      operTypeList: [],
      dataList: [],
      htmlSize: 14,
    };
  },
  mounted() {
    window.addEventListener("resize", this.resizeChart);
  },
  methods: {
    resizeChart() {
      this.$nextTick(() => {
        this.getData(this.dataList);
      });
    },
    getData: throttle(function (list) {
      if (this.myChart) this.myChart.dispose();
      this.dataList = [...list];
      this.data = [];
      this.categories = [];
      let codeData = {};
      // 把不同手术间信息区分开来
      list.forEach((item) => {
        if (item.roomCode in codeData) {
          codeData[item.roomCode].push({ ...item });
        } else {
          codeData[item.roomCode] = [{ ...item }];
          this.categories.push({ value: item.roomCode, name: item.roomCode });
        }
      });
      Object.keys(codeData).forEach((item) => {
        // 同手术间信息按手术时间排序
        codeData[item].sort((a, b) => {
          return a.opsDate < b.opsDate;
        });
        // 同手术间信息设置不同背景色
        codeData[item] = codeData[item].map((val, index) => {
          if (index % 2) return { ...val, color: "#A674FF" };
          return { ...val, color: "#ff7e20" };
        });
        // 数据组合成一个数组
        this.data = this.data.concat(codeData[item]);
      });
      this.categories = list.reduce((pre, item) => {
        if (pre.find((val) => val.value == item.roomCode)) return pre;
        pre.push({ value: item.roomCode, name: item.roomCode });
        return pre;
      }, []);
      this.data = this.data.map((item) => {
        // 值为null，改写成空字符串，防止页面出现null
        Object.keys(item).forEach((val) => {
          if (!item[val]) {
            item[val] = "";
          }
        });
        let endTime = moment(item.opsDate)
          .add(item.duration, "minutes")
          .format("YYYY-MM-DD HH:mm:ss");
        return {
          ...item,
          value: [item.roomCode || null, item.opsDate || null, endTime],
        };
      });
      this.drawPic();
    }, 300),
    drawPic() {
      let self = this;
      var data = [];
      let categories = this.categories;
      data = this.data;
      this.myChart = echarts.init(document.getElementById("echartsIdQuery"));
      let options = {
        tooltip: {
          // tool不展示
          show: true,
          appendToBody: true,
          formatter: (param) => {
            if (
              param.seriesIndex != 0 &&
              param.seriesIndex != 1 &&
              param.seriesIndex != 2
            )
              return "";
            let str = `<div style="text-align:left">科室：${param.data.wardName}-${param.data.bedNo}床</div>
              <div style="text-align:left">姓名：${param.data.patName},${param.data.genderName},${param.data.age}</div>
              <div style="text-align:left">手术：${param.data.roomCode}-${param.data.operSeq}台/${param.data.operateName}</div>
              <div style="text-align:left">术：${param.data.opsDocName}，麻：${param.data.amDocName}</div>
              <div style="text-align:left">洗：${param.data.washNurName}，巡：${param.data.tourNurName}</div>
              `;
            if (param.seriesIndex == 0) {
              str += `<div style="text-align:left">入出手术间：${this.toolFormat(
                param.data.enterTime
              )}--${this.toolFormat(param.data.outTime)}</div> `;
            } else if (param.seriesIndex == 1) {
              str += `<div style="text-align:left">麻醉时间：${this.toolFormat(
                param.data.anaeBeginTime
              )}--${this.toolFormat(param.data.anaeEndTime)}</div> `;
            } else if (param.seriesIndex == 2) {
              str += `<div style="text-align:left">手术时间：${this.toolFormat(
                param.data.opsBeginTime
              )}--${this.toolFormat(param.data.opsEndTime)}</div> `;
            }
            return str;
          },
        },
        grid: {
          containLabel: false,
          show: true,
          bottom: 20,
          right: 0,
          top: "2%",
          left: 0,
        },
        title: {
          show: false,
        },
        xAxis: {
          type: "time",
          interval: "0",
          offset: 0,
          position: "top",
          boundaryGap: ["15%", "10%"],
          // 时间轴样式
          axisLabel: {
            margin: 5,
            fontSize: 16,
            formatter: function (value, index) {
              return moment(value).format("HH:mm");
            },
          },
          // 时间线样式
          axisPointer: {
            show: true,
            label: {
              fontSize: 16,
              padding: 5,
            },
          },
          // 时间轴线的样式设置
          axisLine: {
            show: true,
            lineStyle: {
              width: 1,
            },
          },
          // 时间轴线刻度样式
          axisTick: {
            show: true,
            length: 5,
            lineStyle: {
              width: 1,
            },
          },
        },
        yAxis: {
          data: categories,
          show: true,
          offset: 0,
          inverse: true,
          type: "category",
          splitArea: {
            show: true,
            interval: 0,
            areaStyle: {
              color: ["#F6F8FC", "#ffffff"],
            },
          },
          splitLine: {
            show: false,
          },
          // y轴样式
          axisLabel: {
            show: true,
            margin: 10,
            align: "left",
            interval: 0,
            vertivalAlign: "center",
            boundaryGap: true,
            width: 50,
            formatter: function (val) {
              let obj = categories.find((item) => item.value == val);
              return `${obj.name}`;
            },
            inside: true,
            fontSize: 70,
            minHeight: 70,
            color: "#e7efff",
          },
          axisLine: {
            lineStyle: {
              width: 0.1,
            },
          },
          axisTick: {
            show: false,
          },
        },

        dataZoom: [
          {
            type: "inside",
            id: "insideY",
            yAxisIndex: 0,
            startValue: 0,
            endValue: this.getDataZoomStart(),
            zoomOnMouseWheel: false,
            moveOnMouseMove: true,
            moveOnMouseWheel: true,
          },
          // 底部时间伸缩
          {
            type: "slider",
            xAxisIndex: 0,
            showDetail: false,
            filterMode: "weakFilter",
            height: 30,
            bottom: 0,
            zoomLock: true,
            brushSelect: false,
            backgroundColor: "pink",
            minValueSpan:
              new Date(self.formData.endTime).getTime() -
              new Date(self.formData.beginTime).getTime() +
              3600000,
            maxValueSpan:
              new Date(self.formData.endTime).getTime() -
              new Date(self.formData.beginTime).getTime() +
              3600000,
          },
        ],
        series: [
          // 手术时间
          {
            type: "custom",
            renderItem: this.renderItemOps,
            itemStyle: {
              opacity: 0.8,
            },
            z: 3,
            encode: {
              x: [1, 2, 3, 4, 5, 6, 7, 8, 9],
              y: 0,
            },
            data: data,
          },
          {
            type: "custom",
            renderItem: this.renderItem,
            itemStyle: {
              opacity: 0.8,
            },
            encode: {
              x: [1, 2, 3, 4, 5, 6, 7, 8, 9],
              y: 0,
            },
            data: data,
            z: 4,
          },
        ],
      };
      this.myChart.setOption(options);
      this.myChart.on("touchstart", function (event) {
        event.preventDefault();
      });
      this.$nextTick(() => {
        this.myChart.resize();
      });
    },
    toolFormat(val) {
      if (!val) return "";
      return moment(val).format("HH:mm");
    },
    // 手术时间
    renderItemOps(params, api) {
      let categoryIndex = api.value(0);
      var time3 = api.coord([api.value(1), categoryIndex]);
      var time4 = api.coord([api.value(2), categoryIndex]);
      let row = this.data[params.dataIndex];
      return {
        type: "rect",
        id: "ops",
        shape: {
          x: time3[0],
          y: time4[1],
          width: time4[0] - time3[0],
          height: 30,
          r: [10, 10, 10, 10],
        },
        style: {
          fill: row.color || "#ffc79f",
          textFill: "white",
          textAlign: "left",
        },
      };
    },
    renderItem(params, api) {
      let categoryIndex = api.value(0);
      var time6 = api.coord([api.value(1), categoryIndex]);
      let row = this.data[params.dataIndex];
      let children = [];

      // 手术时长
      if (this.showName.includes(5)) {
        // row.anaeBeginTime
        children.push({
          type: "text",
          x: time6[0],
          y: time6[1] + 8,
          style: {
            text: this.getTime(row.duration),
            fill: "#ffffff",
            fontSize: this.htmlSize * 1.2,
          },
        });
      }
      let underStr = row.operSeq + "台/" + row.operateName;
      if (this.showName.includes(3)) {
        underStr += " " + row.anaeLevel + "级/" + row.anaeName;
      }

      if (this.showName.includes(6)) {
        underStr += " " + row.wardName + "-" + row.bedNo;
      }
      if (this.showName.includes(7)) {
        underStr +=
          " 手术" + row.operateLevel + "级/切口" + row.opsIncisionLevel + "级";
      }
      if (this.showName.includes(8)) {
        underStr +=
          " " +
          (this.operTypeList.find((item) => item.value1 == row.opsType)
            ?.itemName || "");
      }
      // 手术名称
      children.push({
        type: "text",
        x: time6[0],
        y: time6[1] + this.htmlSize,
        style: {
          text: underStr,
          fontFamily: "iconfont",
          fontSize: this.htmlSize * 1.2,
        },
      });
      // 医生护士姓名
      if (row.operateName) {
        let list = [];
        if (this.showName.includes(1)) {
          list.push("主：" + row.opsDocName + " 麻：" + row.amDocName);
        }
        if (this.showName.includes(2)) {
          list.push("巡：" + row.tourNurName + " 洗：" + row.washNurName);
        }
        if (this.showName.includes(4)) {
          list.push(
            "患：" + row.patName + " " + row.genderName + " " + row.age
          );
        }
        children.push({
          type: "text",
          x: time6[0],
          y: time6[1] - this.htmlSize * 0.25,
          style: {
            text: list.join("   "),
            fontFamily: "iconfont",
            fontSize: this.htmlSize * 0.2,
          },
        });
      }
      return {
        type: "group",
        children,
      };
    },
    // 时间格式
    getTime(time) {
      let times = time * 60 * 1000;
      if (times < 60 * 60 * 1000) {
        let m = Math.floor(times / 60000);
        let s = Math.floor((times / 1000) % 60);
        return m + "m" + (s ? s + "s" : "");
      } else {
        let m = Math.floor(times / 3600000);
        let s = Math.floor((times / 60000) % 60);
        return m + "h" + (s ? s + "m" : "");
      }
    },
    // 在不同屏幕上保证每一行的高度
    getDataZoomStart() {
      let allHeight = this.$refs.echartsRef.getBoundingClientRect().height;
      let num = Math.floor(
        (allHeight - this.htmlSize * 1) / (this.htmlSize * 2)
      );
      return allHeight;
    },
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeChart);
  },
};
</script>
<style scoped>
#echartsIdQuery {
  margin: 0 5px;
  width: calc(100% - 10px);
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  border: 1px solid #dadee6;
  border-top: 1px solid #526fea;
  flex-grow: 1;
  flex-shrink: 1;
}
</style>
