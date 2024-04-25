<template>
  <GlobalContainer class="uploader_wrap">
    <div class="uploader_header">
      <uploader
        browse_button="browse_button"
        url="http://47.111.30.53:9520/interaction/file/chunkUploadFile"
        chunk_size="3MB"
        :multi_selection="false"
        :filters="{
          mime_types : [
            { title : 'Image files', extensions : 'jpg,gif,png' },
          ],
        }"
        :FilesAdded="filesAdded"
        :BeforeUpload="beforeUpload"
        @inputUploader="inputUploader"
      />
      <el-button type="primary" id="browse_button">选择文件</el-button>
      <br />
      <el-table :data="tableData" style="width: 100%; margin: 10px 10px">
        <el-table-column label="文件名">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="大小">
          <template slot-scope="scope">
            <span>{{ scope.row.size }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === -1">正在计算MD5</span>
            <span v-if="scope.row.status === 1">MD5计算完成，准备上传</span>
            <span v-if="scope.row.status === 4" style="color: brown"
              >上传失败</span
            >
            <span v-if="scope.row.status === 5" style="color: chartreuse"
              >已上传</span
            >
            <el-progress
              v-if="scope.row.status === 2"
              :text-inside="true"
              :stroke-width="20"
              :percentage="scope.row.percent"
            ></el-progress>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" @click="deleteFile(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <br />
      <el-button type="danger" @click="up.start()">开始上传</el-button>
    </div>
  </GlobalContainer>
</template>

<script>
import FileMd5 from "./components/file-md5";
import uploader from "./components/Uploader.vue";
export default {
  name: "BigFileUpload",
  data() {
    return {
      up: {},
      files: [],
      tableData: [],
    };
  },
  components: {
    uploader
  },
  watch: {
    files: {
      handler() {
        this.tableData = [];
        this.files.forEach((e) => {
          this.tableData.push({
            fileName: e.name,
            size: e.size,
            status: e.status,
            id: e.id,
            percent: e.percent,
          });
        });
      },
      deep: true,
    },
  },
  methods: {
    inputUploader(up) {
      this.up = up;
      this.files = up.files;
    },
    filesAdded(up, files) {
      files.forEach((f) => {
        f.status = -1;
        FileMd5(f.getNative(), (e, md5) => {
          f["md5"] = md5;
          f.status = 1;
        });
      });
    },
    deleteFile(id) {
      let file = this.up.getFile(id);
      this.up.removeFile(file);
    },
    beforeUpload(up, file) {
      up.setOption("multipart_params", {
        size: file.size,
        fileName: file.name,
        md5: file.md5,
      });
    },
  },
};
</script>

<style lang="scss">
.uploader_wrap{
  display: flex;
  flex-direction: column;
  .uploader_header{
    flex: 1;
  }
}
</style>
