<template>
  <div>
    <template v-for="(item, index) in list">
      <template v-if="item.child && item.child.length">
        <el-submenu :index="index + ''" :key="index">
          <template slot="title">
            <div
              style="
                display: flex;
                align-items: center;
                font-weight: normal;
                font-size: 16px;
              "
            >
              <img
                v-show="item.icon"
                style="width: 20px; height: 20px; margin-right: 10px"
                :src="item.icon"
                alt=""
              />
              <span slot="title">{{ item.menuName }}</span>
            </div>
          </template>
          <template v-for="subItem in item.child">
            <el-menu-item :index="subItem.url" :key="subItem.id">
              <i class="iconfont" :class="subItem.icon"></i>
              {{ subItem.menuName }}</el-menu-item
            >
          </template>
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item :index="item.url">
          <img v-show="item.icon" :src="item.icon" alt="" />
          {{ item.menuName }}</el-menu-item
        >
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: "MenuItem",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
