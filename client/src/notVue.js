const app = new Vue ({
    el: "#app",
    data: {
        page: "login",
        addData: "false",
        updateData: "false",
        // deleteData: "false",
        deleteId: "",
        url: "http://localhost:3000",
        tasks: [],
        category: ["Back-Log", "Todo", "Doing", "Done"],
        form_login: {
            email: "",
            password: ""
        },
        form_register: {
            username: "",
            email: "",
            password: ""
        },
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
    },
    methods: {
        changePage (page) {
            this.page = page
        },
        checkAuth() {
            if (localStorage.getItem("access_token")) {
                this.changePage("main")
                this.getAllData()
            } else {
                this.changePage("login")
            }
        },
        userLogin () {
            /*
            - masuk ke server untuk di cek
            - set localStorage
            - pindah halaman main
            */
            console.log(this.form_login)
            localStorage.setItem("access_token", this.form_login.email)
            this.checkAuth()
        },
        userRegister () {
            /*
            - create user di database
            - pindah halaman login
            */
            this.changePage("login")
        },
        isAdd(input) {
            console.log(input)
            this.addData = input
        },
        isUpdate(input, id) {
            if(id) {
                axios({
                    method: "GET",
                    url: `${this.url}/tasks/${id}`
                })
                .then (response => {
                    this.form_update = {
                        id: response.data.id,
                        title: response.data.title,
                        assign_to: response.data.assign_to,
                        description: response.data.description
                    }
                    this.updateData = input
                })
                .catch (err => {
                    console.log(err)
                })
            } else {
                this.updateData = input
            }
        },
        isDelete (id) {
            this.deleteId = id
            console.log(this.deleteId, id)
        },
        logout () {
            console.log("logout")
            localStorage.clear()
            this.checkAuth()
        },
        getAllData () {
            axios({
                method: "GET",
                url: `${this.url}/tasks`
            })
            .then (response => {
                this.tasks = response.data
            })
            .catch (err => {
                console.log(err)
            })
        },
        addBackLog () {
            const category = "Back-Log"

            axios({
                method: "POST",
                url: `${this.url}/tasks`,
                data: { 
                    title: this.form_add.title,
                    assign_to: this.form_add.assign_to,
                    category,
                    description: this.form_add.description
                 }
            })
            .then (response => {
                this.checkAuth()
                this.isAdd("false")
            })
            .catch (err => {
                console.log(err)
            })
        },
        updateBackLog () {
            const category = "Back-Log"
            const { id, title, assign_to, description } = this.form_update
            axios({
                method: "PUT",
                url: `${this.url}/tasks/${id}`,
                data: {
                    title,
                    assign_to,
                    description,
                    category
                }
            })
            .then (response => {
                this.checkAuth()
                this.isUpdate("false")
            })
            .catch (err => {
                console.log(err)
            })
        },
        removeData(id) {
            axios({
                method: "DELETE",
                url: `${this.url}/tasks/${id}`
            })
            .then (response => {
                this.checkAuth()
                this.isDelete("")
            })
            .catch(err => {
                console.log(err)
            })
        },
    },
    created: function() {
       this.checkAuth()
    }
})