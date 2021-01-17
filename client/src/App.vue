<template>
  <div id="my-kanban-app">
    <div v-if="mainPage === 'home-page'">
      <my-kanban-app @checkAuth="checkAuth" id="my-home-page" ><my-kanban-app>
    </div>
    <div v-else-if="mainPage === 'kanban-page'">
      <my-kanban-board
    @checkAuth="checkAuth"
    @signOut="signOut"
    id="my-kanban-board"
  ></my-kanban-board>
    </div>
  </div>
</template>

<script>
import MyKanbanApp from "./components/MyKanbanApp.vue";
import MyKanbanBoard from "./components/MyKanbanBoard.vue";

export default {
  name: "App",
  data() {
    return {
      page: "get-started-page",
      mainPage: "home-page",
    };
  },
  components: {
    MyKanbanApp,
    MyKanbanBoard,
  },
  methods: {
    checkAuth() {
      if (localStorage.access_token) {
        this.changeMainPage("kanban-page");
      } else {
        this.changeMainPage("home-page");
        this.page = "get-started-page";
        this.user = {
          name: "",
          email: "",
          password: "",
        };
      }
    },
    changeMainPage(mainPageName) {
      if (this.mainPageName === "kanban-page") {
        this.page = "";
      }
      this.mainPage = mainPageName;
    },
    changeName(name) {
      this.profilName = name;
    },
    signOut() {
      localStorage.clear();
      this.checkAuth();
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {});
    },
  },
  created: function () {
    this.checkAuth();
  },
  mount: function () {},
};
</script>

<style>
</style>