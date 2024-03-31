<template>
  <el-row :gutter="10" class="panel-group" ref="group">
    <BlockItem v-for="(item, index) in blockList" :key="index" :row="item">
    </BlockItem>
  </el-row>
</template>

<script>
import BlockItem from "./BlockItem.vue";
export default {
  components: {
    BlockItem,
  },
  data() {
    return {
      blockList: [
        {
          title: "食物热量查询",
          name: "食物热量查询，食物卡路里大全",
          icon: "https://img.api.aa1.cn/2023/06/19/ffdff1ee2d2ac.jpg",
          api: "https://api.52vmy.cn/api/query/food?food=番茄",
        },
        {
          title: "身份证号码用户信息查询",
          name: "身份证号码用户信息查询, 地区、星座、年龄、性别 等",
          icon: "https://img.api.aa1.cn/2023/06/19/ffdff1ee2d2ac.jpg",
          api: "https://tools.mgtv100.com/external/v1/identity_info/query?idCard=330782198909021723",
        },
        {
          title: "狗屁不通文章生成",
          name: "生成一篇文章，水字数，如此简单",
          icon: "https://img.api.aa1.cn/2023/06/19/ffdff1ee2d2ac.jpg",
          api: "https://api.52vmy.cn/api/wl/s/dog?msg=维梦",
        },
        {
          title: "星座运势",
          name: "今日的星座运势",
          icon: "https://img.api.aa1.cn/2023/11/07/c1dd98675821c.png",
          api: "https://api.52vmy.cn/api/wl/s/xingzuo?msg=射手座",
        },
        {
          title: "QQ等级信息查询",
          name: "查询QQ等级、剩余升级天数、活跃天数等等",
          icon: "https://img.api.aa1.cn/2024/01/21/7635e031d3784.png",
          api: "http://api.52hyjs.com/api/level?qq=419437697",
        },
        {
          title: "小人举牌，可换行",
          name: "nodejs开发，小人举牌，除了自定义文字之外，支持换行举牌。",
          icon: "https://img.api.aa1.cn/2023/11/01/4c34a034057a9.png",
          api: "http://niningqi.com/upword/12%20%0A12",
        },
        {
          title: "头像框生成",
          name: "加个炫酷的头框嘛?很多种类哦~",
          icon: "https://img.api.aa1.cn/2024/02/07/bf3a2f9ca1028.png",
          api: "http://api.wxsszs.cn/api/tksc.php?qq=3189402257",
        },
        {
          title: "快递查询",
          name: "查询快递物流信息",
          icon: "https://img.api.aa1.cn/2024/01/21/7635e031d3784.png",
          api: "https://api.oioweb.cn/api/common/delivery?nu=123456",
        },
      ],
    };
  },
};
</script>