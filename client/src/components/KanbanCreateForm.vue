<template>
  <div class="card-body" :style="style">
    <div v-if="errorCreate !== ''">
      <div v-for="(err, idx) in errorCreate" :key="idx">
        <p
          style="font-size: 11px; margin-bottom: 5px; background-color: red"
          v-if="err.message === 'Validation isAfter on dueDate failed'"
        >
          Date should be tomorrow or more
        </p>
        <p
          style="font-size: 11px; margin-bottom: 5px; background-color: red"
          v-else-if="err.message === 'Validation notEmpty on title failed'"
        >
          Title field is required
        </p>
        <p
          style="font-size: 11px; margin-bottom: 5px; background-color: red"
          v-else-if="
            err.message === 'Validation notEmpty on description failed'
          "
        >
          Description field is required
        </p>
        <p
          style="font-size: 11px; margin-bottom: 5px; background-color: red"
          v-else-if="err.message === 'Validation notEmpty on dueDate failed'"
        >
          Date field is required
        </p>
      </div>
    </div>
    <form @submit.prevent="createData">
      <div class="form-floating mb-1">
        <input
          v-model="task.title"
          type="text"
          class="form-control"
          required="required"
          id="floatingInput"
          placeholder="Title"
        />
        <label for="floatingInput">Title</label>
      </div>
      <div class="form-floating mb-1">
        <input
          v-model="task.dueDate"
          type="datetime-local"
          class="form-control"
          required="required"
          id="floatingInput"
          placeholder="Due Date"
        />
        <label for="floatingInput">Due Date</label>
      </div>
      <div class="form-floating">
        <textarea
          v-model="task.description"
          class="form-control"
          placeholder="Leave a description here"
          id="floatingTextarea2"
          style="height: 100px"
          required="required"
        ></textarea>
        <label for="floatingTextarea2">Description</label>
      </div>
      <button
        type="submit"
        class="btn btn-warning btn-sm"
        style="margin-top: 10px"
        @click.prevent="createData(task)"
      >
        Add Task
      </button>
      <a
        role="button"
        class="btn btn-danger btn-sm"
        style="margin-top: 10px"
        @click="$emit('hideCreateForm')"
        >Cancel</a
      >
    </form>
  </div>
</template>

<script>
export default {
  name: "KanbanCreateForm",
  data() {
    return {
      style: `";
          background-color: grey;
        "`,
      errorCreate: "",
      task: {
        title: "",
        dueDate: "",
        description: "",
        status: this.cardCategory,
      },
    };
  },
  props: ["cardCategory"],
  methods: {
    hideCreateForm() {
      this.$emit("hideCreateForm");
    },
    changeStyle() {
      if (this.cardCategory === "Backlog") {
        this.style = `";
          background-color: #174d65;
        "`;
      } else if (this.cardCategory === "Todo") {
        this.style = `";
          background-color: #8ed2db;
        "`;
      } else if (this.cardCategory === "Doing") {
        this.style = `";
          background-color: #e7d9bf;
        "`;
      } else if (this.cardCategory === "Done") {
        this.style = `";
          background-color: #2d5942;
        "`;
      }
    },
    createData(value) {
      axios({
        method: "POST",
        url: "https://server-kang-bang.herokuapp.com/",
        data: {
          value,
        },
        headers: { access_token: localStorage.getItem("access_token") },
      })
        .then((task) => {
          this.getData();
          this.hideCreateForm();
        })
        .catch((err) => {
          this.errorCreate = err.response.data.errorMessage;
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