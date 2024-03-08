<template>
  <el-container class="layout_warp">
    <el-aside
      width="200px"
      class="layout_aside"
      style="background-color: rgb(238, 241, 246)"
    >
      <el-menu
        router
        unique-opened
        style="height: 100%"
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        text-color="#282c34"
        active-text-color="#409eff"
        @select="selectMenu"
      >
        <MenuItem :list="navList"></MenuItem>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header
        style="text-align: right; font-size: 12px; background: #495259"
      >
        头部
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "layout",
  data() {
    return {
      defaultActive: "/json-editor",
      navList: [
        {
          menuName: "Component",
          id: "1",
          child: [
            {
              menuName: "json-editor",
              id: "01",
              url: "/json-editor",
            },
          ],
        },
        {
          menuName: "Table",
          id: "2",
          child: [
            {
              menuName: "dashboard",
              id: "02",
              url: "/dashboard",
            },
          ],
        },
        {
          menuName: "EchartsSetOf",
          id: "3",
          child: [
            {
              menuName: "GanttChart",
              id: "03",
              url: "/ganttChart",
            },
          ],
        },
        {
          menuName: "Timeline",
          id: "3",
          child: [
            {
              menuName: "timeline",
              id: "03",
              url: "/timeline",
            },
          ],
        },
      ],
    };
  },
  methods: {
    selectMenu(v) {
      this.defaultActive = v;
    },
  },
};
</script>

<style>
.layout_warp {
  height: 100vh;
  width: 100vw;
}
.layout_aside {
  width: 3.1778rem;
  flex-grow: 0;
  flex-shrink: 0;
  overflow: auto;
  height: 100vh;
  background: white;
}
.el-menu-item.is-active {
  background: #dcf0fe !important;
  font-weight: 700;
}
</style>
