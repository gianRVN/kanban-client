<template>
  <section>
    <nav-welcome @changePage="changePage"></nav-welcome>
    <div
      class="modal-dialog"
      style="position: absolute; top: 0; left: 0; right: 0; bottom: 0"
      v-if="errorMessage !== ''"
    >
      <div class="modal-content" style="border: 1px solid red">
        <div class="modal-header">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="changeErrorMessage('')"
          ></button>
        </div>
        <div class="modal-body" v-for="(err, idx) in errorMessage" :key="idx">
          {{ err }}
        </div>
      </div>
    </div>
    <div id="start-container">
      <div class="my-container">
        <sign-in-form
          v-if="page === 'sign-in-page'"
          @checkAuth="$emit('checkAuth')"
          @changePage="changePage"
          @changeErrorMessage="changeErrorMessage"
        >
        </sign-in-form>
        <sign-up-form
          v-else-if="page === 'sign-up-page'"
          @checkAuth="$emit('checkAuth')"
          @changePage="changePage"
          @changeErrorMessage="changeErrorMessage"
        ></sign-up-form>
        <get-started
          v-else-if="page === 'get-started-page'"
          @changePage="changePage"
        ></get-started>
        <why-kanban
          v-else-if="page === 'why-kanban-page'"
          @changePage="changePage"
        ></why-kanban>
        <about-us
          v-else-if="page === 'about-us-page'"
          @changePage="changePage"
        ></about-us>
        <wallpaper></wallpaper>
      </div>
    </div>
  </section>
</template>

<script>
import AboutUs from "./AboutUs";
import NavWelcome from "./NavWelcome";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import GetStarted from "./GetStarted";
import WhyKanban from "./WhyKanban";
import Wallpaper from "./Wallpaper";

export default {
  data() {
    return {
      page: "get-started-page",
      errorMessage: "",
      user: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  name: "MyKanbanApp",
  components: {
    AboutUs,
    NavWelcome,
    SignInForm,
    SignUpForm,
    GetStarted,
    WhyKanban,
    Wallpaper,
  },
  methods: {
    changePage(pageName) {
      this.page = pageName;
      this.user = {
        name: "",
        email: "",
        password: "",
      };
      this.errorMessage = "";
    },
    changeErrorMessage(name) {
      this.errorMessage = name;
    },
  },
};
</script>

<style>
</style>