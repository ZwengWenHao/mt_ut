<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        :class="['tags-view-item', { active: isActive(tag) }]"
        @click.middle.native="closeSelectedTag(tag)"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <span
          v-if="!tag.meta.affix"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </scroll-pane>
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li
        v-for="item in contextmenu"
        :key="item.value"
        @click="handleContextmenu(item.value)"
      >
        {{ item.lable }}
      </li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from "./ScrollPane.vue";
import { mapActions, mapGetters } from "vuex";
import path from "path-browserify";
export default {
  components: { ScrollPane },
  data() {
    return {
      arrfixTags: [],
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      contextmenu: [
        {
          value: "closeSelectedTag",
          lable: "关闭",
        },
        {
          value: "closeOthersTags",
          lable: "关闭其他",
        },
        {
          value: "closeAllTags",
          lable: "关闭全部",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["permission_routers", "visitedViews"]),
  },
  watch: {
    $route() {
      this.addTags();
      this.moveToCurrentTag();
    },
    visible(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    },
  },
  mounted() {
    this.initTags();
    this.addTags();
  },
  methods: {
    ...mapActions({
      addVisitedView: "tagsView/addVisitedView",
      addView: "tagsView/addView",
      delView: "tagsView/delView",
      updateVisitedView: "tagsView/updateVisitedView",
      delOthersViews: "tagsView/delOthersViews",
    }),
    isActive(route) {
      return route.path === this.$route.path;
    },
    filterAffixTags(routes, basePath = "/") {
      return routes.reduce((tags, route) => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path);
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta },
          });
        }
        if (route.children) {
          const childTags = this.filterAffixTags(route.children, route.path);
          return [...tags, ...childTags];
        }
        return tags;
      }, []);
    },
    initTags() {
      const arrfixTags = (this.arrfixTags = this.filterAffixTags(
        this.permission_routers
      ));
      for (const tag of arrfixTags) {
        if (tag.name) {
          this.addVisitedView(tag);
        }
      }
    },
    addTags() {
      const { name } = this.$route;
      if (name) {
        this.addView(this.$route);
      }
      return false;
    },
    // 防止从新打开老页面没有反应
    moveToCurrentTag() {
      const tags = this.$refs.tag;
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag);
            // 如果当前页面与选中页面不一致 更新当前页面
            if (tag.to.fullPath !== this.$route.fullPath) {
              updateVisitedView(this.$route);
            }
          }
        }
      });
    },
    // 点击关闭删除当前
    closeSelectedTag(tag) {
      this.delView(tag).then(({ visitedViews }) => {
        if (this.isActive(tag)) {
          this.toLastView(visitedViews, tag);
        }
      });
    },
    // 关闭其他
    closeOthersTags(tag) {
      // 由于 vue-router3.0 及以上版本回调形式改成Promise API的形式
      // this.$router.push(tag) 会报重复跳转的错误
      this.$router.push(tag, () => {});
      this.delOthersViews(this.selectedTag).then((_) => {
        this.moveToCurrentTag();
      });
    },
    toLastView(visitedViews, view) {
      // 如果删除的是当前选中的tag 那么删除后就选中当前tag删除前的tag状态
      const latestView = visitedViews.slice(-1)[0];
      if (latestView) {
        this.$router.push(latestView);
      } else {
        if (view.name === "Dashboard") {
          this.$router.replace({ path: "/redirect" + view.fullPath });
        } else {
          this.$router.push("/");
        }
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 105;
      const offsetLeft = this.$el.getBoundingClientRect().left;
      const offsetWidth = this.$el.offsetWidth;
      const maxLeft = offsetWidth - menuMinWidth;
      const left = e.clientX - offsetLeft + 15;
      if (left > maxLeft) {
        this.left = maxLeft;
      } else {
        this.left = left;
      }
      this.top = e.clientY;
      this.visible = true;
      this.selectedTag = tag;
    },
    handleContextmenu(v) {
      if (!this.selectedTag.meta.affix && v && typeof this[v] === "function")
        return this[v](this.selectedTag);
    },
    closeMenu() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.tags-view-container {
  width: 100%;
  height: 34px;
  line-height: 34px;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
