<template>
  <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
    <div class="card-panel-col-item">
      <img class="col-item-icon" :src="row.icon" alt="" />
      <div class="col-item-name">
        <div class="title">{{ row.title }}</div>
        <div class="name">{{ row.name }}</div>
      </div>
    </div>
  </el-col>
</template>

<script>
export default {
  props: {
    row: {
      type: Object,
      default: () => {},
    },
  },
};
</script>