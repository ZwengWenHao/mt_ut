<template>
  <div class="PanelGroup">头部</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "dashboard",
  data(){
    return{
      
    }
  },
  computed:{
    ...mapGetters(['roles'])
  }
};
</script>

<style></style>
