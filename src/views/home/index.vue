<template>
  <div class="home">
    <PanelGroup></PanelGroup>
    <LineChart></LineChart>
  </div>
</template>

<script>
import PanelGroup from "./components/PanelGroup.vue";
import LineChart from "./components/LineChart.vue";
export default {
  name: 'Dashboard',
  components: {
    PanelGroup,
    LineChart,
  },
};
</script>

<style></style>
