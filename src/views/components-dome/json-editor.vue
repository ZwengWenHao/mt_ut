<template>
  <div class="json-editor">
    <JsonEditor
      :visible.sync="jsonDrawerVisible"
      :json-str="JSON.stringify(formData)"
    ></JsonEditor>
  </div>
</template>

<script>
import JsonEditor from "../../components/JsonEditor/index.vue";
export default {
  components: { JsonEditor },
  data() {
    return {
      jsonDrawerVisible: false,
      formData: {},
    };
  },
  methods: {
    handleOpen() {
      this.jsonDrawerVisible = true;
    },
  },
};
</script>

<style>
.json-editor {
  height: 100%;
}
</style>
