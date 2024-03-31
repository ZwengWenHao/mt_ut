<template>
  <div class="drag_dialog">
    <DragDialog />
  </div>
</template>

<script>
import DragDialog from "./components/DragDialog.vue";
export default {
  components: {
    DragDialog,
  },
};
</script>

<style>
.drag_dialog{
    padding: 5px;
}
</style>