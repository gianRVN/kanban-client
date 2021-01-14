<template>
 
    <div id="app">
        <!-- ===== NAVBAR ===== -->
        <div class="container">
            <nav class="navbar navbar-expand-lg fixed-top navbar-light">
                <div class="container-fluid">
                <a class="navbar-brand" href="#" style="font-style: italic; font-weight: bold;">Kanvan</a>
                </div>
                <div v-if="page === 'main'">
                    <button id="logout-button"  class="btn btn-outline-dark mr-5" v-on:click="logout">Logout</button>
                </div>
            </nav>
        </div>
        <!-- ===== END OF NAVBAR ===== -->

    
   
        <!-- ===== FORM LOGIN ===== -->
        <LoginForm 
            @changePage="changePage"
            @cekLogin="cekLogin"
            v-if="page === 'login'"
            ></LoginForm>
        <!-- ===== END OF FORM LOGIN ===== -->


        <!-- ===== FORM REGISTER ===== -->
        <RegisterForm
            @changePage="changePage"
            v-if="page === 'register'"
            ></RegisterForm>
        <!-- ===== END OF FORM REGISTER ====== -->

        <!-- ===== KANBAN CONTAINER ===== -->
        <MainPage
            :categories="categories"
            :tasks="tasks"
            v-if="page === 'main'"
            ></MainPage>
        <!-- ===== END OF KANBAN CONTAINER -->
    </div>

</template>

<script>
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm"
import MainPage from "./components/MainPage"

export default {
    name: "App",
    data() {
        return {
            page: "login",
            addData: "false",
            updateData: "false",
            deleteId: "",
            url: "http://localhost:3000",
            tasks: [],
            categories: ["Back-Log", "Todo", "Doing", "Done"],
            form_add: {
                title: "",
                assign_to: "",
                description: ""
            },
            form_update: {
                id: "",
                title: "",
                assign_to: "",
                description: ""
            }
        }
        
    },
    methods: {
        cekLogin (input) {
            this.checkAuth()
        },
        changePage (page) { 
            this.page = page
        },
        checkAuth() {
            console.log(localStorage.getItem("access_token"))
            if (localStorage.getItem("access_token")) {
                this.changePage("main")
                this.getAllData()
            } else {
                this.changePage("login")
            }
        },   
    },
    components: {
        LoginForm,
        RegisterForm,
        MainPage
    }
}
</script>

<style>

</style>