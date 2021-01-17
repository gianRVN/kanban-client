import GAuth from 'vue-google-oauth2'
const gauthOption = {
    clientId: `${process.env.GOOGLE_CLIENT_ID}`,
    scope: 'profile email',
    prompt: 'select_account'
}

import Vue from "vue"
import App from "./App.vue"

Vue.use(GAuth, gauthOption)
new Vue({
    render: h => h(App)
}).$mount("#app")