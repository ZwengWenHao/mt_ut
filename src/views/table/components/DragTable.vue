<template>
  <div class="app-container r4">
    <el-card class="box-card">
      <el-tag>默认顺序：</el-tag> {{ oldList }} <el-tag>拖动后的顺序 :</el-tag>
      {{ newList }}
    </el-card>
    <el-table
      ref="dragTable"
      :data="list"
      row-key="id"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="ID" width="65">
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="Date">
        <template slot-scope="{ row }">
          <span>{{ row.timestamp }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="Title">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="Author">
        <template slot-scope="{ row }">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Readings" width="95">
        <template slot-scope="{ row }">
          <span>{{ row.pageviews }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Status" width="110">
        <template slot-scope="{ row }">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Drag" width="80">
        <template slot-scope="{}">
          <svg-icon class="drag-handler" icon-class="drag" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
  
  <script>
import Sortable from "sortablejs";

export default {
  name: "DragTable",
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      list: [
        {
          id: 1,
          timestamp: 971778462676,
          author: "Brenda",
          reviewer: "Karen",
          title:
            "Iepxpx Crpkwuogg Ksbzhdc Mpopdt Cnixu Aldfficw Ymhohcldvk Dlsgq Rbgrfgre",
          content_short: "mock data",
          content:
            '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
          forecast: 18.85,
          importance: 2,
          type: "JP",
          status: "published",
          display_time: "2001-02-24 20:34:30",
          comment_disabled: true,
          pageviews: 3885,
          image_uri:
            "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
          platforms: ["a-platform"],
        },
        {
          id: 2,
          timestamp: 828375724355,
          author: "Robert",
          reviewer: "Donna",
          title:
            "Osdanwxnw Rbqvlqfvx Euzcvc Mnldtvocmt Cgbkgdyfyh Eoon Ufnrk Ejdclb",
          content_short: "mock data",
          content:
            '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
          forecast: 82.34,
          importance: 1,
          type: "JP",
          status: "draft",
          display_time: "1995-06-11 16:36:17",
          comment_disabled: true,
          pageviews: 4117,
          image_uri:
            "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
          platforms: ["a-platform"],
        },
        {
          id: 3,
          timestamp: 328235475456,
          author: "Edward",
          reviewer: "Steven",
          title: "Hdvtcvfr Mwkjbglhon Hqqtpltf Fdxpfbbe Drqh Ewnkmukt",
          content_short: "mock data",
          content:
            '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
          forecast: 89.23,
          importance: 1,
          type: "CN",
          status: "draft",
          display_time: "2006-01-30 03:34:20",
          comment_disabled: true,
          pageviews: 2283,
          image_uri:
            "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
          platforms: ["a-platform"],
        },
        {
          id: 4,
          timestamp: 568951353484,
          author: "Daniel",
          reviewer: "Angela",
          title: "Jcyn Ggxdlkmt Mtwgvlqs Siirwkl Tyincxorf Hrhk",
          content_short: "mock data",
          content:
            '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
          forecast: 45.28,
          importance: 1,
          type: "JP",
          status: "published",
          display_time: "1988-06-11 08:56:34",
          comment_disabled: true,
          pageviews: 3352,
          image_uri:
            "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
          platforms: ["a-platform"],
        },
        {
          id: 5,
          timestamp: 288505631483,
          author: "Donald",
          reviewer: "Barbara",
          title: "Jwf Ciehdf Hqgnfr Dhnhx Yuzgzvtwj Ioqfxwgq Tvvnxce",
          content_short: "mock data",
          content:
            '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
          forecast: 5.63,
          importance: 2,
          type: "CN",
          status: "draft",
          display_time: "2014-12-06 03:56:13",
          comment_disabled: true,
          pageviews: 2615,
          image_uri:
            "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
          platforms: ["a-platform"],
        },
        {
          id: 6,
          timestamp: 200164586544,
          author: "Barbara",
          reviewer: "Helen",
          title: "Imbdbhx Oqk Upcgl Uvsbhf Qshgxcnhod Kcedhnwny Xrefmgx Hhhpfd",
          content_short: "mock data",
          content:
            '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
          forecast: 94.82,
          importance: 2,
          type: "US",
          status: "draft",
          display_time: "2001-02-11 04:28:48",
          comment_disabled: true,
          pageviews: 1087,
          image_uri:
            "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
          platforms: ["a-platform"],
        },
        {
          id: 7,
          timestamp: 788728380621,
          author: "Linda",
          reviewer: "Patricia",
          title:
            "Aemtxhqy Avyh Tlwbqln Qsuv Ygc Cxkqo Zbtvfqfpk Ctzcxrc Ddlvnel",
          content_short: "mock data",
          content:
            '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
          forecast: 54.13,
          importance: 2,
          type: "JP",
          status: "published",
          display_time: "2019-07-21 01:51:37",
          comment_disabled: true,
          pageviews: 2694,
          image_uri:
            "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
          platforms: ["a-platform"],
        },
      ],
      listQuery: {
        page: 1,
        limit: 10,
      },
      sortable: null,
      oldList: [],
      newList: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.oldList = this.list.map((v) => v.id);
      this.newList = this.oldList.slice();
      this.$nextTick(() => {
        this.setSort();
      });
    },
    setSort() {
      const el = this.$refs.dragTable.$el.querySelectorAll(
        ".el-table__body-wrapper > table > tbody"
      )[0];
      this.sortable = Sortable.create(el, {
        ghostClass: "sortable-ghost",
        setData: function (dataTransfer) {
          dataTransfer.setData("Text", "");
        },
        onEnd: (evt) => {
          const targetRow = this.list.splice(evt.oldIndex, 1)[0];
          this.list.splice(evt.newIndex, 0, targetRow);
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0];
          this.newList.splice(evt.newIndex, 0, tempIndex);
        },
      });
    },
  },
};
</script>
  
  <style>
.sortable-ghost {
  opacity: 0.8;
  color: #fff !important;
  background: #42b983 !important;
}
</style>
  
  <style scoped>
.icon-star {
  margin-right: 2px;
}
.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.show-d {
  margin-top: 15px;
}
</style>
  