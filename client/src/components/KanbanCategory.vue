<template>
  <div class="col-3">
    <div
      class="card"
      style="width: 19rem; padding-bottom: 15px; padding-top: 0px; height: 100%"
    >
      <h6
        style="
          text-align: center;
          margin-bottom: 0px;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
        "
        :style="style"
      >
        {{ cardCategory }}
      </h6>
      <button
        style="
          text-align: center;
          padding-top: 5px;
          padding-bottom: 5px;
          margin-bottom: 10px;
          margin-top: 10px;
          margin-left: 1rem;
          margin-right: 1rem;
          width: 90%;
        "
        @click="showCreateForm(cardCategory)"
      >
        <i class="fas fa-plus-circle"></i>
      </button>
      <div class="for-overflow" style="overflow: scroll">
        <div
          class="card"
          style="
            width: 17rem;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 16px;
          "
          v-if="formTask === cardCategory"
        >
          <kanban-create-form
            :cardCategory="cardCategory"
            @getData="getData"
            @hideCreateForm="hideCreateForm"
          ></kanban-create-form>
        </div>

        <task-list
          v-for="task in taskList"
          :key="task.id"
          :task="task"
          :cardCategory="cardCategory"
          @getData="getData"
          @checkAuth="checkAuth"
        ></task-list>
      </div>
    </div>
  </div>
</template>

<script>
import KanbanCreateForm from "./KanbanCreateForm.vue";
import TaskList from "./TaskList.vue";

export default {
  name: "KanbanCategory",
  data() {
    return {
      style: `";
          background-color: grey;
          color: white;
        "`,
      taskList: [],
      formTask: "",
      task: {
        title: "",
        description: "",
        status: "",
        dueDate: "",
      },
    };
  },
  components: {
    KanbanCreateForm,
    TaskList,
  },
  props: ["cardCategory"],
  methods: {
    checkAuth() {
      this.$emit("checkAuth");
    },
    changeStyle() {
      if (this.cardCategory === "Backlog") {
        this.style = `";
          background-color: #174d65;
          color: white;
        "`;
      } else if (this.cardCategory === "Todo") {
        this.style = `";
          background-color: #8ed2db;
          color: black;
        "`;
      } else if (this.cardCategory === "Doing") {
        this.style = `";
          background-color: #e7d9bf;
          color: black;
        "`;
      } else if (this.cardCategory === "Done") {
        this.style = `";
          background-color: #2d5942;
          color: white;
        "`;
      }
    },
    getData() {
      axios({
        method: "GET",
        url: "https://server-kang-bang.herokuapp.com/",
        headers: { access_token: localStorage.getItem("access_token") },
      })
        .then((task) => {
          this.taskList = task.data;
        })
        .catch((err) => {});
    },
    showCreateForm(text) {
      this.formTask = text;
      this.task.status = text;
      this.task.title = "";
      this.task.description = "";
      this.task.dueDate = "";
    },
    hideCreateForm() {
      this.formTask = "";
      this.task.status = "";
      this.task.title = "";
      this.task.description = "";
      this.task.dueDate = "";
    },
  },
  created: function () {
    this.changeStyle();
    this.getData();
  },
};
</script>

<style>
</style>