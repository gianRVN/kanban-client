<template>
  <section>
    <nav-kanban
      @signOut="signOut"
      :categoryList="category"
      @addCategory="addCategory"
      @deleteCategoryList="deleteCategoryList"
    ></nav-kanban>
    <div
      class="my-container"
      style="
        overflow-x: scroll;
        overflow-y: hidden;
        height: 80vh;
        margin-bottom: 50px;
        margin-top: 50px;
        margin-left: 50px;
        margin-right: 50px;
      "
    >
      <kanban-category
        v-for="(cardCategory, idx) in category"
        :key="idx"
        :cardCategory="cardCategory.name"
        @checkAuth="checkAuth"
      >
      </kanban-category>
    </div>
    <kanban-footer></kanban-footer>
  </section>
</template>

<script>
import NavKanban from "./NavKanban";
import KanbanCategory from "./KanbanCategory";
import KanbanFooter from "./KanbanFooter";

export default {
  name: "MyKanbanBoard",
  data() {
    return {
      category: [],
    };
  },
  components: {
    NavKanban,
    KanbanCategory,
    KanbanFooter,
  },
  methods: {
    checkAuth() {
      this.$emit("checkAuth");
    },
    deleteCategoryList(text) {
      axios({
        method: "DELETE",
        url: `https://server-kang-bang.herokuapp.com/category/${text}`,
        data: {},
        headers: { access_token: localStorage.getItem("access_token") },
      })
        .then((task) => {
          this.getDataCategory();
        })
        .catch((err) => {});
    },
    getDataCategory() {
      axios({
        method: "GET",
        url: `https://server-kang-bang.herokuapp.com/category`,
        headers: { access_token: localStorage.getItem("access_token") },
      })
        .then((categoryList) => {
          this.category = categoryList.data;
        })
        .catch((err) => {});
    },
    addCategory(text) {
      console.log("BERSIAP");
      axios({
        method: "POST",
        url: `https://server-kang-bang.herokuapp.com/category`,
        data: {
          category: text,
        },
        headers: { access_token: localStorage.getItem("access_token") },
      })
        .then((category) => {
          this.getDataCategory();
        })
        .catch((err) => {});
    },
    signOut() {
      this.$emit("signOut");
    },
  },
  created: function () {
    this.getDataCategory();
  },
};
</script>

<style>
</style>