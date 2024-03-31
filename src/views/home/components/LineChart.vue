<template>
  <div class="line_chart">
    <HeadBlock />
    <LineBarChart ref="lineBarChart" :chartData="chartData" />
  </div>
</template>

<script>
import LineBarChart from "./linechart/LineBarChart.vue";
import HeadBlock from "./linechart/HeadBlock.vue";
export default {
  components: {
    HeadBlock,
    LineBarChart,
  },
  data() {
    return {
      timer: null,
      chartData: {
        monthDates: [],
        lineData: [],
        barData: [],
      },
    };
  },
  created() {
    this.getLineChartData()
    this.timer = setInterval(this.getLineChartData, 5000);
  },
  methods: {
    getLineChartData() {
      for (const key in this.chartData) {
        this.chartData[key] = [];
      }
      this.chartData = {
        monthDates: this.getRecentMonthDates(),
        lineData: this.generateRandomLineData(),
        barData: this.generateRandomLineData(35, 18000, 48000),
      };
      this.$nextTick(() => {
        this.$refs.lineBarChart.initChart();
      });
    },
    getRecentMonthDates() {
      const moment = this.$moment;
      const dates = [];
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth();
      for (let i = 0; i < 30; i++) {
        const date = new Date(currentYear, currentMonth, today.getDate() - i);
        dates.push(moment(date).format("MM-DD"));
      }
      return dates;
    },
    generateRandomLineData(length = 30, min = 18000, max = 68000) {
      const lineData = [];
      for (let i = 0; i < length; i++) {
        const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
        lineData.push(randomValue);
      }
      return lineData;
    },
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
};
</script>