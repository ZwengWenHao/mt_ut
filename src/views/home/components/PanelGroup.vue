<template>
  <div class="panel_group">
    <!-- <DailyCard /> -->
    <OneWordPerDay />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DailyCard from "./panelgroup/DailyCard.vue";
import OneWordPerDay from "./panelgroup/OneWordPerDay.vue";
export default {
  name: "dashboard",
  components: {
    DailyCard,
    OneWordPerDay,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["roles"]),
  },
};
</script>
