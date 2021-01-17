<template>
  <p style="font-size: 11px; margin-top: 10px">
    You Don't Have Access to Delete This Task
  </p>
</template>

<script>
export default {
  name: "KanbanUpdateForm",
  data() {
    return {
      style: `";
          background-color: grey;
        "`,
      taskUpdated: {
        title: "",
        dueDate: "",
        description: "",
        status: this.task.status,
      },
    };
  },
  props: ["task"],
  methods: {
    hideUpdateForm() {
      this.$emit("hideUpdateForm");
    },
    changeStyle() {
      if (this.task.status === "Backlog") {
        this.style = `";
          background-color: #174d65;
        "`;
      } else if (this.task.status === "Todo") {
        this.style = `";
          background-color: #8ed2db;
        "`;
      } else if (this.task.status === "Doing") {
        this.style = `";
          background-color: #e7d9bf;
        "`;
      } else if (this.task.status === "Done") {
        this.style = `";
          background-color: #2d5942;
        "`;
      }
    },
    getData() {
      this.$emit("getData");
    },
  },
  created: function () {
    this.changeStyle();
  },
};
</script>

<style>
</style>