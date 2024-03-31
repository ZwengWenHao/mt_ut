<template>
  <section class="app_main">
    <!-- <keep-alive>
      <router-view :key="key" />
    </keep-alive> -->
    <router-view :key="key" />
  </section>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  computed: {
    key() {
      return this.$route.path;
    },
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss">
.app_main {
  // min-height: calc(100vh - 85px);
  min-height: 100vh;
  padding-top: 84px;
  overflow: hidden;
  position: relative;
}
</style>
