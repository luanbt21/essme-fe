<template>
  <!-- <img class="background" src="src\assets\carousel.png" /> -->
  <div class="navbar pr-[10px]">
    <p class="logo">ESSME</p>
    <!-- responsive -->
    <label  for="nav-respon-input" class="nav__bars-btn nav__bars-responsive item ">
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="bars"
        class="svg-inline--fa fa-bars fa-w-14 mt-[4px] h-[30px]"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        
      >
        <path
          fill="currentColor"
          d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
        ></path>
      </svg>
    </label>
    <!-- <label for="nav-respon-input"></label> -->
    <input type="checkbox" class="nav-imput" name="" id="nav-respon-input" />
    <label for="nav-respon-input" class="nav__overlay"></label>
    <!-- Nav respon -->
    <nav class="nav__responsive">
      <label for="nav-respon-input" class="nav__responsive-close">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="times"
          class="svg-inline--fa fa-times fa-w-11"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 352 512"
        >
          <path
            fill="currentColor"
            d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
          ></path>
        </svg>
      </label>
      <ul class="nav_respon--list">
        <li class="nav_bar_res_li nav_bar_res_li-hover">
          <a href="" class="nav_respon--link">Home</a>
        </li>
        <li class="nav_bar_res_li">

          <li class="nav_bar_res_li nav_bar_res_li-hover"><a href="" class="nav_respon--link">Expert</a></li>
          <ul>
            <li class="nav_bar_res_li nav_bar_res_li-hover"><a class="sub_nav_res-list" href="">FQAs</a></li>
            <li class="nav_bar_res_li nav_bar_res_li-hover"><a class="sub_nav_res-list" href="">Order Expert</a></li>
            <li class="nav_bar_res_li nav_bar_res_li-hover"><a class="sub_nav_res-list" href="">Expert Info</a></li>
          </ul>
        </li>
        <li class="nav_bar_res_li">
          <li class="nav_bar_res_li nav_bar_res_li-hover"><a href="" class="nav_respon--link">Languages</a></li>
          <ul>
            <li class="nav_bar_res_li nav_bar_res_li-hover"><a class="sub_nav_res-list" href="">English</a></li>
            <li class="nav_bar_res_li nav_bar_res_li-hover"><a class="sub_nav_res-list" href="">Tiếng Việt</a></li>
          </ul>
        </li>
        <li class="nav_bar_res_li">
          <li class="nav_bar_res_li nav_bar_res_li-hover"><a href="" class="nav_respon--link">Login</a></li>

        </li>
      </ul>
    </nav>

    <!-- none responsive -->
    <div v-if="!isLogin" class="nav-dropdown nav__bars-noneresponsive item">
    
    <router-link to="/login"><button class="nav-dropbtn">Login</button></router-link>
    </div>

    <div v-if="isLogin" class="nav-dropdown  nav__bars-noneresponsive item hover:cursor-pointer">
      <div>
        <img src="../../assets/user.png" 
        class="h-[52px] rounded-full mr-[40px] mt-[2px]" 
        alt=""
        >
      </div>
      <div class="nav-dropdown-content border-radius-up border-radius-down">
        <a class="border-radius-up">Profile Settings</a>
        <a>History</a>
        <a @click="handleClick" class="border-radius-down">Log out</a>
      </div>
    </div>

    <div v-if="isLogin" class="nav-dropdown nav__bars-noneresponsive item hover:cursor-pointer" style="width: auto;">
      <img src="../../assets/notification.png" 
        class="h-[35px]  mr-[40px] ml-[20px] mt-[12px]" 
        alt=""
        >
    </div>

    <div class="nav-dropdown nav__bars-noneresponsive item">
      <button class="nav-dropbtn">Languages</button>
      <div class="nav-dropdown-content border-radius-up border-radius-down">
        <a class="border-radius-up">English</a>
        <a class="border-radius-down">Tiếng Việt</a>
      </div>
    </div>

    <div class="nav-dropdown nav__bars-noneresponsive item">
      <router-link to="/news/"><button class="nav-dropbtn">News</button></router-link> 
    </div>


    <div class="nav-dropdown nav__bars-noneresponsive item">
      <button class="nav-dropbtn">Events</button>
    </div>

    <div class="nav-dropdown nav__bars-noneresponsive item">
      <button class="nav-dropbtn">Expert</button>
      <div class="nav-dropdown-content border-radius-up border-radius-down">
        <a class="border-radius-up">FQAs</a>
        <a>Order Expert</a>
        <a class="border-radius-down">Expert Info</a>
      </div>
    </div>
    <div class="nav-dropdown nav__bars-noneresponsive item">
        <router-link to="/"><button class="nav-dropbtn">Home</button></router-link>
    </div>
  </div>
  <img class="nav-img" src="../../assets/carousel.png" alt="" />
</template>

<script setup lang="ts">
import { useStore } from '~/store/index'
import { computed, onUpdated } from 'vue'
import axios from 'axios'
import { __baseURL } from '~/constant'
const store = useStore()
const handleClick = () => {
  store.dispatch('auth/logout')
}
const isLogin = computed(() => store.state.auth.user)


onUpdated(async () => {
  if(isLogin.value){  const token = computed(() => store.state.auth.token)
  console.log(token.value)
  const headers = { 
    "Authorization": `Bearer ${token.value}`,
  };
  await axios.post("/news", {
  stt: "string",
  img: "string",
  tag: "string",
  title: "string",
  url: "string",
  content: "string",
  status: "string"
  }, {
    headers
  })}

})
console.log(axios.defaults.headers )

</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: Roboto;
}
:root {
  --maincolor: #b9cec7;
  --btncolor: #95c2b0;
}
.navbar {
  position: fixed;
  left: 2.5%;
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
  /* flex-direction: row; */
  /* flex-wrap: wrap; */
  /* background-color: #d4d7de; */
  /* width: 90%; */
  /* height: 70px; */
  z-index: 1;
  top: 0.3cm;
  margin: 0 auto; /* Căn giữa block element */
  width: 95%;
  height: 56px;
  background: var(--maincolor);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}
.nav-img {
  height: 548px;
  width: 100%;
  /* background-color: none !important; */
}
.background {
  height: 548px;
  width: 100%;
  position: fixed;
}
.top {
  position: fixed;
  left: 30px;
  position: absolute;
  top: 0px;
}
.border-radius-up {
  /* border-top-left-radius: 5px; */
  border-top-right-radius: 5px;
}
.border-radius-down {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.nav-dropbtn {
  background-color: var(--maincolor);
  color: black;
  font-weight: normal;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  width: 150px;
}

/* Dùng trong <div> để định vị nội dung thả xuống */
.nav-dropdown {
  position: relative;
  display: inline-block;
  border-radius: 10px;
}

/* / * Nội dung thả xuống (Ẩn theo mặc định) * / */
.nav-dropdown-content {
  display: none;
  position: absolute;
  background-color: var(--btncolor);
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

/* / * Liên kết bên trong danh sách thả xuống * / */
.nav-dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* / * Thay đổi định dạng của liên kết thả xuống khi di chuột qua * / */
.nav-dropdown-content a:hover {
  background-color: var(--btncolor);
  color: white;
}

/* / * Hiển thị menu thả xuống khi di chuột * / */
.nav-dropdown:hover .nav-dropdown-content {
  display: block;
}

/* / * Thay đổi màu nền của nút thả xuống khi nội dung được hiển thị * / */
.nav-dropdown:hover .nav-dropbtn {
  background-color: var(--btncolor);
}
/*  */
.color {
  background-color: var(--btncolor);
}
.font {
  font-family: Arial, Helvetica, sans-serif;
  font-size: larger;
  color: #000000;
}
.item {
  float: right;
  font-family: Arial, Helvetica, sans-serif;
  margin-left: 0cm;
  margin-right: 0cm;
  color: #000000;
}
.logo {
  float: left;
  margin-top: 0.45cm;
  margin-left: 1cm;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  color: #000000;
  background-color: var(--btncolors);
}
/* navbar-- responsive*/
.nav__bars-btn {
  width: 28px;
  height: 28px;
  color: black;
  padding-top: 10px;
  display: none;
}
.nav__overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: none;
  animation: fadeIn linear 0.2s;
}
.nav__responsive {
  position: fixed;
  /* display: flex;
  justify-content: center; */
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  padding-top: 50px;
  max-width: 100%;
  background-color: rgb(130, 171, 185);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 1);
  transform: translateX(100%);
  opacity: 0;
  transition: transform linear 0.2s;
}
.nav_bar_res_li {
  list-style: none;
  /* float: right; */
  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-align: center;
  /* border-width: thick; */

  /* align-items: center; */
  /* border: 1px;
  margin: 0; */
}

.nav-imput {
  display: none;
}
.nav-imput:checked ~ .nav__overlay {
  display: block;
}
.nav-imput:checked ~ .nav__responsive {
  transform: translateX(0%);
  opacity: 1;
}

.nav_respon--link,
.sub_nav_res-list {
  list-style: none;
  text-decoration: none;
  font-size: 20px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;

  display: block;

  padding: 8px 0;
}
.nav_bar_res_li-hover :hover {
  background-color: var(--maincolor);
}
.nav_respon--link :hover {
  background-color: var(--maincolor);
}

.nav__responsive-close {
  width: 28px;
  height: 28px;
  position: absolute;
  top: 10px;
  left: 10px;
  color: #2e2a2a;
}
@media (max-width: 1200px) {
  .nav__bars-btn {
    display: block;
  }
  .nav__bars-noneresponsive {
    display: none;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
