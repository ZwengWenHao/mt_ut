<template>
    <div class="components-container">
      <el-button type="primary" @click="dialogTableVisible = true">
        打开可拖动的对话框
      </el-button>
      <el-dialog v-el-drag-dialog :visible.sync="dialogTableVisible" title="弹窗名称" @dragDialog="handleDrag">
        <el-table :data="gridData">
          <el-table-column property="date" label="Date" width="150" />
          <el-table-column property="name" label="Name" width="200" />
          <el-table-column property="address" label="Address" />
        </el-table>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import elDragDialog from '@/directive/el-drag-dialog'
  
  export default {
    name: 'DragDialogDemo',
    directives: { elDragDialog },
    data() {
      return {
        dialogTableVisible: false,
        gridData: [{
          date: '2016-05-02',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-04',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-01',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-03',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }]
      }
    },
    methods: {
      handleDrag() {
        this.$refs.select.blur()
      }
    }
  }
  </script>
  