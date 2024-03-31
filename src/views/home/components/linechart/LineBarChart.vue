<template>
  <div id="LineBarChart" class="lineBarChart"></div>
</template>

<script>
import * as echarts from "echarts";
import resize from "@/mixins/resize";
export default {
  name: "LineBarChart",
  props: {
    chartData: {
      type: Object,
      required: true,
    },
  },
  mixins: [resize],
  data() {
    return {
      chart: null,
    };
  },
  watch:{
    chartData:{
      handler(v){
        this.setOptions(v);
      }
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el);
      this.setOptions(this.chartData);
    },
    setOptions({lineData, barData, monthDates}) {
      let rateData = [];
      for (var i = 0; i < 33; i++) {
        var rate = barData[i] / lineData[i];
        rateData[i] = rate.toFixed(2);
      }
      let option = {
        title: {
          show: false,
          text: "访客量统计",
          x: "center",
          y: 0,
          textStyle: {
            color: "#B4B4B4",
            fontSize: 16,
            fontWeight: "normal",
          },
        },
        backgroundColor: "#ffffff",
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(255,255,255,0.1)",
          axisPointer: {
            type: "shadow",
            label: {
              show: true,
              backgroundColor: "#7B7DDC",
            },
          },
        },
        legend: {
          data: ["已访问", "预计访问", "访问率"],
          textStyle: {
            color: "#B4B4B4",
          },
          top: "5%",
        },
        grid: {
          top: "10%",
          bottom: "5%",
          left: "3%",
          right: "3%",
          containLabel: true,
        },
        xAxis: {
          data: monthDates,
          axisLine: {
            lineStyle: {
              color: "#B4B4B4",
            },
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: [
          {
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: "#B4B4B4",
              },
            },

            axisLabel: {
              formatter: "{value} ",
            },
          },
          {
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: "#B4B4B4",
              },
            },
            axisLabel: {
              formatter: "{value} ",
            },
          },
        ],

        series: [
          {
            name: "访问率",
            type: "line",
            smooth: true,
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 8,
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: "#F02FC2",
              },
            },
            data: rateData,
          },
          {
            name: "已访问",
            type: "bar",
            barWidth: "50%",
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#956FD4" },
                  { offset: 1, color: "#3EACE5" },
                ]),
              },
            },
            data: barData,
          },
          {
            name: "预计访问",
            type: "bar",
            barGap: "-100%",
            barWidth: "50%",
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "rgba(156,107,211,0.5)" },
                  { offset: 0.2, color: "rgba(156,107,211,0.3)" },
                  { offset: 1, color: "rgba(156,107,211,0)" },
                ]),
              },
            },
            z: -12,
            data: lineData,
          },
        ],
      };
      this.chart.setOption(option);
    },
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
};
</script>
