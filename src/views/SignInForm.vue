<template>
  <div
    class="bg-slate-200 grid place-items-center absolute top-0 left-0 right-0 bottom-0 z-10 flex bg-[url('../assets/login_background.png')]"
  >
    <div class="nav_login">
      <ul class="nav_login-list nav_login-list-one">
        <li class="nav_login-item hover:cursor-pointer">ESSME</li>
      </ul>
      <ul class="nav_login-list nav_login-list-second">
        <li class="nav_login-item hover:cursor-pointer"><router-link to="/">Home</router-link></li>
        <li class="nav_login-item hover:cursor-pointer">Expert</li>
        <li class="nav_login-item hover:cursor-pointer">Languages</li>
        <li class="nav_login-item hover:cursor-pointer">
          <img class="img img__login_icon--small_size" src="../assets/facebook.png" alt="" />
        </li>
        <li class="nav_login-item hover:cursor-pointer">
          <img class="img img__login_icon--small_size" src="../assets/twitter.png" alt="" />
        </li>
        <li class="nav_login-item hover:cursor-pointer">
          <img class="img img__login_icon--small_size" src="../assets/instagram.png" alt="" />
        </li>
      </ul>
    </div>

    <form @submit.prevent="handleSubmit" class="form relative top-[-40px] rounded-lg" id="form-2">
      <h3 class="heading relative bottom-[10px]">Sign In</h3>
      <button class="bg-slate-300 w-[100%] flex items-center justify-center h-[49px] rounded-xl">
        <img src="../assets/google.png" class="h-[40px]" alt="" />
        <div class="relative left-[15px]">Sign In With Google</div>
      </button>
      <a
        class="relative top-[10px] text-sky-400/50 hover:text-sky-400"
        href="https://accounts.google.com/signup/v2/webcreateaccount?hl=vi&flowName=GlifWebSignIn&flowEntry=SignUp"
        target="_blank"
      >
        Sign Up With Google
      </a>
    </form>

    <!-- footer nav -->
    <div class="nav_login_bottom relative top-[-20px]">
      <ul class="nav_login_bottom-list">
        <li class="nav_login_bottom-item">ESSME</li>
        <li class="nav_login_bottom-item">ABOUT US</li>
        <li class="nav_login_bottom-item">BLOG</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import { useStore } from '~/store/index'
// import firebase from 'firebase/app'
import 'firebase/auth'
import { useRouter } from 'vue-router' // import router

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const store = useStore()

const handleSubmit = async () => {
  try {
    await store.dispatch('auth/login')
    router.push('/')
  } catch (err) {
    error.value = 'Bạn đã nhập sai email hoặc mật khẩu!'
  }
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html {
  color: #333;
  font-size: 62.5%;
  font-family: 'Open Sans', sans-serif;
}
.main {
  background: #f1f1f1;
  min-height: 100vh;
  display: flex;
  justify-content: center;
}
.form {
  width: 360px;
  min-height: 100px;
  padding: 32px 24px;
  text-align: center;
  background: #fff;
  margin: 24px;
  align-self: center;
  box-shadow: 0 2px 5px 0 rgba(51, 62, 73, 0.1);
}
.form .heading {
  font-size: 2rem;
}
.form .desc {
  text-align: center;
  color: #636d77;
  font-size: 1.6rem;
  font-weight: lighter;
  line-height: 2.4rem;
  margin-top: 16px;
  font-weight: 300;
}

.form-group {
  display: flex;
  margin-bottom: 16px;
  flex-direction: column;
}

.form-label,
.form-message {
  text-align: left;
}

.form-label {
  font-weight: 700;
  padding-bottom: 6px;
  line-height: 1.8rem;
  font-size: 1.4rem;
}

.form-control {
  height: 40px;
  padding: 8px 12px;
  border: 1px solid #b3b3b3;
  border-radius: 3px;
  outline: none;
  font-size: 1.4rem;
}

.form-control:hover {
  border-color: #1dbfaf;
}

.form-group.invalid .form-control {
  border-color: #f33a58;
}

.form-group.invalid .form-message {
  color: #f33a58;
}

.form-message {
  font-size: 1.2rem;
  line-height: 1.6rem;
  padding: 4px 0 0;
}

.form-submit {
  outline: none;
  background-color: #1dbfaf;
  margin-top: 12px;
  padding: 12px 16px;
  font-weight: 600;
  color: #fff;
  border: none;
  width: 100%;
  font-size: 14px;
  border-radius: 8px;
  cursor: pointer;
}

.form-submit:hover {
  background-color: #1ac7b6;
}

.spacer {
  margin-top: 36px;
}

.img__login_background {
  width: 100%;
  height: 100%;
}
.nav_login-list {
  list-style: none;
  padding-left: 0;
}
.nav_login {
  position: relative;
  width: 100%;
  min-height: 50px;
  display: inline-flex;
  justify-content: space-between;
}
.nav_login-item {
  color: rgba(0, 0, 0, 1);
  list-style: none;
  margin: 0 8px;
  display: inline-flex;
}
.nav_login-item:first-child {
  margin-left: 150px;
}
.nav_login-list-one {
  font-size: 1.2rem;
}
.nav_login-item:last-child {
  margin-right: 110px;
}
.img__login_icon--small_size {
  width: 18px;
  height: 20px;
}
.img__login_icon--large_size {
  width: 40px;
  height: 40px;
}
.icon
/* // BOTTOM NAV */
.nav_login_bottom {
  width: 100%;
  position: flex;
  bottom: 4mm;
  display: flex;
}
.nav_login_bottom-list {
  list-style: none;
  display: inline-flex;
}
.nav_login_bottom-item {
  margin: 0 8px;
}
.login_main_center-layout {
  background-color: rgb(192, 227, 194);
  flex-direction: column;
  margin: 70px auto 0 auto;
  padding: 32px 0;
  max-width: 400px;
  height: 250px;
  display: flex;
  border-radius: 30px;
}
.center-layout__item:first-child {
  margin: 0 auto;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 25px;
  align-self: flex-start;
}
.center-layout__item:last-child {
  margin: 0 auto;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 25px;
  align-self: flex-start;
}
.signIn-google {
  height: 30%;
  width: 75%;
  margin-top: 10%;
  background-color: #90aaa1;
  display: flex;
  align-self: center;
  border-radius: 20px;
  justify-content: center;
}
.icon-google {
  align-self: center;
}
.gg-text-signinWith {
  width: 60%;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
}
</style>
