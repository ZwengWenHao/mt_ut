<template>
  <div class="navbar">
    <Hamburger :isActive="sidebar.opened" @toggleSideBar="toggleSideBar" />
    <RightMenu />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Hamburger from "./components/Hamburger.vue";
import RightMenu from "./components/RightMenu.vue";
export default {
  name: "",
  components: {
    Hamburger,
    RightMenu,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["sidebar"]),
  },
  methods: {
    ...mapActions({
      toggleSideBar: "app/toggleSideBar",
    }),
  },
};
</script>
