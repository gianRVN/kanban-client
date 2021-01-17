<template>
  <div class="my-home-form">
    <form @submit.prevent="signin">
      <h1>Sign In</h1>
      <input
        v-model="user.email"
        type="email"
        class="form-control"
        required="required"
        id="email-signin"
        style="text-align: center; border: 2px solid #174d65"
        placeholder="Email Address"
      />
      <div id="help-signin" class="form-text">
        We'll never share your email with anyone else.
      </div>
      <input
        v-model="user.password"
        type="password"
        class="form-control"
        id="password-signin"
        required="required"
        placeholder="Password"
        style="
          border: 2px solid #174d65;
          text-align: center;
          margin-bottom: 30px;
        "
      />
      <div id="my-button-yes">
        <button
          class="btn btn-warning"
          id="open-signin"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          @click.prevent="signin()"
        >
          Sign In
        </button>
      </div>
      <h5 style="margin-bottom: 20px; text-align: center">
        Or Sign In with Social Platforms
      </h5>
      <button
        id="google-signin-button"
        style="margin-bottom: 50px; margin-left: auto; margin-right: auto"
        class="d-flex justify-content-center"
        @click.prevent="onSignIn()"
      ></button>
      <div class="row-5" style="text-align: center">
        <a
          class="btn btn-success"
          role="button"
          id="create-account"
          @click.prevent="changePage('sign-up-page')"
          >Create Account</a
        >
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignInForm",
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    signin() {
      axios({
        method: "POST",
        url: `https://server-kang-bang.herokuapp.com/signin`,
        data: {
          email: this.user.email,
          password: this.user.password,
        },
      })
        .then((task) => {
          localStorage.setItem("access_token", task.data.access_token);
          localStorage.setItem("user", `Hi, ${task.data.name}`);
          this.user.name = task.data.name;
          this.changeErrorMessage("");
          this.checkAuth();
        })
        .catch((err) => {
          this.changeErrorMessage(err.response.data);
          this.checkAuth();
        });
    },
    changePage(value) {
      this.$emit("changePage", value);
    },
    checkAuth() {
      this.$emit("checkAuth");
    },
    changeErrorMessage(name) {
      this.$emit("changeErrorMessage", name);
    },
    changeMainPage(value) {
      this.$emit("changeMainPage", value);
    },
    onSignIn(user) {
      var id_token = user.getAuthResponse().id_token;

      axios({
        method: "POST",
        url: `https://server-kang-bang.herokuapp.com/google`,
        data: {
          name: user.getBasicProfile().Ed,
          email: user.getBasicProfile().tu,
          password: id_token,
        },
      })
        .then((task) => {
          this.checkAuth();
          this.changeMainPage("home-page");
          localStorage.setItem("user", `Hi, ${user.getBasicProfile().Ed}`);
          localStorage.setItem("access_token", task.data.access_token);
          this.checkAuth();
        })
        .catch((err) => {});
    },
  },
  mounted() {
    gapi.signin2.render("google-signin-button", {
      onsuccess: this.onSignIn,
    });
  },
};
</script>

<style>
</style>