<template>
  <div class="card-body" :style="style">
    <div v-if="errorUpdate !== ''">
      <div v-for="(err, idx) in errorUpdate" :key="idx">
        <p
          style="font-size: 11px; background-color: red; margin-bottom: 5px"
          v-if="err.message === 'Validation isAfter on dueDate failed'"
        >
          Date should be tomorrow or more
        </p>
        <p
          style="font-size: 11px; background-color: red; margin-bottom: 5px"
          v-else-if="err.message === 'Validation notEmpty on title failed'"
        >
          Title field is required
        </p>
        <p
          style="font-size: 11px; background-color: red; margin-bottom: 5px"
          v-else-if="
            err.message === 'Validation notEmpty on description failed'
          "
        >
          Description field is required
        </p>
        <p
          style="font-size: 11px; background-color: red; margin-bottom: 5px"
          v-else-if="err.message === 'Validation notEmpty on dueDate failed'"
        >
          Date field is required
        </p>
      </div>
    </div>
    <form @submit.prevent="updateData()">
      <div class="form-floating mb-1">
        <input
          v-model="taskUpdated.title"
          type="text"
          class="form-control"
          id="floatingInput"
          :placeholder="task.title"
          required="required"
        />
        <label for="floatingInput">{{ task.title }}</label>
      </div>
      <div class="form-floating mb-1">
        <input
          v-model="taskUpdated.dueDate"
          type="datetime-local"
          class="form-control"
          required="required"
          id="floatingInput"
          :placeholder="task.dueDate"
        />
        <label for="floatingInput">{{ task.dueDate }}</label>
      </div>
      <div class="form-floating">
        <textarea
          v-model="taskUpdated.description"
          class="form-control"
          :placeholder="task.description"
          id="floatingTextarea2"
          style="height: 100px"
          required="required"
        ></textarea>
        <label for="floatingTextarea2">{{ task.description }}</label>
      </div>
      <button
        type="submit"
        class="btn btn-warning btn-sm"
        style="margin-top: 10px"
        @click="updateData(task.id)"
      >
        Edit Task
      </button>
      <a
        role="button"
        class="btn btn-danger btn-sm"
        style="margin-top: 10px"
        @click="hideUpdateForm"
        >Cancel</a
      >
    </form>
  </div>
</template>

<script>
export default {
  name: "KanbanUpdateForm",
  data() {
    return {
      style: `";
          background-color: grey;
        "`,
      errorUpdate: "",
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
    updateData() {
      axios({
        method: "PUT",
        url: `https://server-kang-bang.herokuapp.com/${this.task.id}`,
        data: {
          data: this.taskUpdated,
        },
        headers: { access_token: localStorage.getItem("access_token") },
      })
        .then((task) => {
          this.getData();
          this.hideUpdateForm();
        })
        .catch((err) => {
          this.errorUpdate = err.response.data.errorMessage;
        });
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