<template>
  
    <!-- ===== FORM LOGIN ===== -->
    <div id="login" 
        class="container d-flex justify-content-center col-5 mt-3">

        <div 
            class="container card d-flex justify-content-center mt-5 bg-light">

            <form 
                method="POST" 
                v-on:submit.prevent="userLogin">

                <h3 
                    style="text-align: center;" 
                    class="m-3 border-bottom border-info"
                    >Welcome to Kanvan!</h3>
                
                <div 
                    class="mb-3">

                    <label 
                        for="email-login" 
                        class="form-label" 
                        >Email address</label>
                    
                    <input 
                        type="email" 
                        class="form-control" 
                        id="email-login" 
                        v-model="email">
                    
                    <div 
                        class="form-text"
                        >We'll never share your email with anyone else.</div>
                </div>
                <div 
                    class="mb-3">
                    <label 
                        for="password-login" 
                        class="form-label"
                        >Password</label>
                    
                    <input 
                        type="password" 
                        class="form-control" 
                        id="password-login" 
                        v-model="password">
                </div>
                <div 
                    class="mb-3">
                    <button 
                        type="submit" 
                        class="btn btn-primary" 
                        id="login-button"
                        >Submit</button>
                    
                    <a 
                        href="/" 
                        id="go-register" 
                        v-on:click.prevent="changePage('register')"
                        >Not Registered Yet?</a>
                        
                </div>
            </form>
        </div>
    </div>
    <!-- ===== END OF FORM LOGIN ===== -->
</template>

<script>
export default {
    name: "LoginForm",
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        userLogin () {
            /*
            - masuk ke server untuk di cek
            - set localStorage
            - pindah halaman main
            */
            
            
            localStorage.setItem("access_token", this.email)
            this.$emit("cekLogin", "login")
        },
        changePage(input) {  
           
            this.$emit("changePage", input )
        },
    }
}
</script>

<style>

</style>