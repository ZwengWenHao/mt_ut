<template>
  <div class="json-editor">
    <JsonEditor
      :visible.sync="jsonDrawerVisible"
      :json-str="formData"
      @refresh="refresh"
    ></JsonEditor>
    <button @click="jsonDrawerVisible = true">打开</button>
  </div>
</template>

<script>
import JsonEditor from "../../components/JsonEditor/index.vue";
import { Local } from "@/utils/storage";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { JsonEditor },
  data() {
    return {
      jsonDrawerVisible: false,
      formData: '',
    };
  },
  computed: {
    ...mapGetters({
      permission: "user/permission",
    }),
  },
  created() {
    this.getFormData();
  },
  methods: {
    getFormData() {
      this.formData = Local.get("permission");
    },
    ...mapActions({
      changeRoles: "user/changeRoles",
    }),
    handleOpen() {
      this.jsonDrawerVisible = true;
    },
    refresh() {
      this.changeRoles();
    },
  },
};
</script>

<style>
.json-editor {
  height: 100%;
}
</style>
