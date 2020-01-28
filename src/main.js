import Vue from 'vue'
import router from './router'
import * as firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/auth'
import App from './App.vue'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyA8utpIbGHpyVA_QqqHzuARIQJrmzXKsAA",
  authDomain: "esp32db-d4ce0.firebaseapp.com",
  databaseURL: "https://esp32db-d4ce0.firebaseio.com",
  projectId: "esp32db-d4ce0",
  storageBucket: "esp32db-d4ce0.appspot.com",
  messagingSenderId: "891825082097",
  appId: "1:891825082097:web:d6eb074e3e77bb9e826350"
}

firebase.initializeApp(firebaseConfig)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
