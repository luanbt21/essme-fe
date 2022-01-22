<template>
  <div
    class="bg-slate-200 grid place-items-center absolute min-h-screen top-0 left-0 right-0 bottom-0 z-10 flex bg-[url('src/assets/login_background.png')]"
  >
    <div class="nav_login relative top-[30px]">
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

    <form @submit.prevent="handleSubmit" class="form relative top-[20px] rounded-lg" id="form-1">
      <h3 class="heading">Đăng ký</h3>

      <div class="spacer"></div>

      <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input
          id="email"
          v-model="email"
          name="email"
          type="text"
          placeholder="VD: email@domain.com"
          class="form-control"
        />
        <span class="form-message"></span>
      </div>

      <div class="form-group">
        <label for="password" class="form-label">Mật khẩu</label>
        <input
          v-model="password"
          id="password"
          name="password"
          type="password"
          placeholder="Nhập mật khẩu"
          class="form-control"
        />
        <span class="form-message"></span>
      </div>

      <div class="form-group">
        <label for="password_confirmation" class="form-label">Nhập lại mật khẩu</label>
        <input
          id="password_confirmation"
          v-model="passCf"
          @change="comparePassword"
          name="password_confirmation"
          placeholder="Nhập lại mật khẩu"
          type="password"
          class="form-control"
        />
        <span class="form-message"></span>
      </div>
      <a id="wrongPasswordMes" class="text-red-500 hidden" href="">Nhập sai mật khẩu</a>
      <div v-if="error" class="text-red-500">{{ error }}</div>
      <button class="form-submit">Đăng ký</button>
    </form>

    <!-- footer nav -->
    <div class="nav_login_bottom relative top-[-20px] m-auto">
      <ul class="nav_login_bottom-list">
        <li class="nav_login_bottom-item ml-[50px]">ESSME</li>
        <li class="nav_login_bottom-item">ABOUT US</li>
        <li class="nav_login_bottom-item">BLOG</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onUpdated, ref } from 'vue'
import { useStore } from '~/store/index'
import { useRouter } from 'vue-router' // import router
import { onMounted } from 'vue'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const store = useStore()

const handleSubmit = async () => {
  try {
    await store.dispatch('auth/signup', {
      email: email.value,
      password: password.value
    })
    router.push('/ExpertOrCustomerStatus')
  } catch (err) {
    error.value = 'Tài khoản đã tồn tại'
    alert(err)
  }
}

const passCf = ref('')
const comparePassword = () => {
  if (password.value === passCf.value && password.value.length === passCf.value.length ? false : true) {
    document.querySelector('#wrongPasswordMes')?.classList.remove('hidden')
    console.log('fasdkf')
  } else document.querySelector('#wrongPasswordMes')?.classList.add('hidden')
}

onUpdated(async () => {
  // if (password.value === passCf.value && password.value.length === passCf.value.length ? false : true) {
  //   document.querySelector('#wrongPasswordMes')?.classList.remove('hidden')
  //   console.log('fasdkf')
  // }
  // console.log(password.value)
})
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

/* 
 */

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
  margin: 0 15px;
}
.nav_login_bottom-item:first-child {
  margin-left: 100px;
}
.img__login_icon--small_size {
  width: 18px;
  height: 20px;
}
</style>
