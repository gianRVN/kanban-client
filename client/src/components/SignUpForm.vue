<template>
  <div class="my-home-form">
    <form @submit.prevent="signup">
      <h1>Sign Up</h1>
      <input
        v-model="user.myName"
        type="text"
        class="form-control"
        id="name-signup"
        required="required"
        style="
          text-align: center;
          border: 2px solid #174d65;
          margin-bottom: 30px;
        "
        placeholder="Name"
      />
      <input
        v-model="user.email"
        type="email"
        class="form-control"
        id="email-signup"
        style="text-align: center; border: 2px solid #174d65"
        placeholder="Email Address"
        required="required"
      />
      <div id="help-signup" class="form-text">
        We'll never share your email with anyone else.
      </div>
      <input
        v-model="user.password"
        type="password"
        required="required"
        class="form-control"
        id="password-signup"
        placeholder="Password"
        style="
          border: 2px solid #174d65;
          text-align: center;
          margin-bottom: 30px;
        "
      />
      <div id="my-button-signup">
        <button
          class="btn btn-primary"
          id="open-signin"
          @click.prevent="signup()"
        >
          Sign Up
        </button>
      </div>
      <h5 style="margin-bottom: 20px; text-align: center">
        Already have an account?
      </h5>
      <div id="my-button-yes">
        <a
          class="btn btn-warning"
          id="open-signin"
          @click="changePage('sign-in-page')"
          >Sign In</a
        >
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignUpForm",
  data() {
    return {
      user: {
        myName: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    signup() {
      axios({
        method: "POST",
        url: `https://server-kang-bang.herokuapp.com/signup`,
        data: {
          name: this.user.myName,
          email: this.user.email,
          password: this.user.password,
        },
      })
        .then((task) => {
          localStorage.setItem("access_token", task.data.access_token);
          localStorage.setItem("user", `Hi, ${task.data.name}`);
          this.user.myName = task.data.name;
          this.changeErrorMessage("");
          this.checkAuth();
        })
        .catch((err) => {
          let temp = [];
          console.log(err);
          err.response.data.errorMessage.forEach((el) => {
            temp.push(el.message);
          });
          this.changeErrorMessage(temp);
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
  },
};
</script>

<style>
</style>