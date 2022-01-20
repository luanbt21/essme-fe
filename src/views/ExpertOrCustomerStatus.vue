<template>
  <div class="wrap">
    <div class="Infor-main">
      <button class="update-profile">Update Profile</button>
      <div class="check-box-form">
        <p>Choose your role:</p>
        <label for="">
          <label for="expertInfoForm">
            <input @change="exInfo = !exInfo" type="radio" name="checkbox" id="check_expert" checked />
          </label>
          Expert
        </label>
        <label for="">
          <input @change="exInfo = !exInfo" type="radio" name="checkbox" id="check_customer" />
          Customer
        </label>
      </div>
      <!-- expertInfoForm -->
      <div class="expertInfoForm">
        <div class="infor_necessary">
          <div class="infor_necessary-left">
            <img :src="avatarImage" alt="" class="info_avatar" />
            <!-- <img class="info_avatar" src="src\assets\avatar.jpg" alt="" /> -->
            <button class="btn_upload-photo">Upload Photo</button>
          </div>
          <div class="infor_necessary-right">
            <div class="row-input">
              <label class="label-form" for="">Name:</label>
              <input type="text" name="name" id="" placeholder="TRINH KHANH HUYEN" />
            </div>
            <div class="row-input">
              <label class="label-form" for="">Gender:</label>
              <input type="text" name="gender" id="" placeholder="Female" />
            </div>
            <div class="row-input">
              <label class="label-form" for="">Birth:</label>
              <input type="text" name="birth" id="" placeholder="28/08/2001" />
            </div>
            <div class="row-input">
              <label class="label-form" for="">Phone:</label>
              <input type="text" name="phone" id="" placeholder="0987 332 991" />
            </div>
            <div class="row-input">
              <label class="label-form" for="">Address:</label>
              <input type="text" name="address" id="" placeholder="NEU, 207 Giai Phong, Hai Ba Trung, Ha Hoi" />
            </div>
            <div class="row-input">
              <label class="label-form" for="">Email:</label>
              <input type="text" name="email" id="" placeholder="tkhuyen@gmail.com" />
            </div>
            <div class="row-input">
              <label class="label-form" for="">Interest:</label>
              <input type="text" name="interest" id="" />
            </div>
          </div>
        </div>
        <div v-if="exInfo" class="field-info">
          <div class="row-input">
            <label class="label-form" for="">Address:</label>
            <input type="text" name="address" id="" placeholder="NEU, 207 Giai Phong, Hai Ba Trung, Ha Hoi" />
          </div>
          <div class="row-input">
            <label class="label-form" for="">Email:</label>
            <input type="text" name="email" id="" placeholder="tkhuyen@gmail.com" />
          </div>
          <div class="row-input">
            <label class="label-form" for="">Interest:</label>
            <input type="text" name="interest" id="" />
          </div>
          <textarea class="textarea-infoProject" placeholder="Your Projects..." id="" name="" rows="6"></textarea>
        </div>
        <!-- block 3 -->
        <div class="Info-block3">
          <textarea
            class="textarea-infoProject Info-block3-txtarea"
            placeholder="Bio"
            id=""
            name=""
            rows="6"
          ></textarea>
          <div class="Info-block3-bottom-part">
            <div class="Infor-block3-column">
              <div class="row-input">
                <label class="label-form" for="">Website:</label>
                <input type="text" name="" id="" placeholder="your link" />
              </div>
              <div class="row-input">
                <label class="label-form" for="">Facebook:</label>
                <input type="text" name="" id="" placeholder="your link" />
              </div>
            </div>
            <div class="Infor-block3-column-2"></div>
            <div class="Infor-block3-column">
              <div class="row-input">
                <label class="label-form" for="">Twitter:</label>
                <input type="text" name="" id="" placeholder="your link" />
              </div>
              <div class="row-input">
                <label class="label-form" for="">Linkedin:</label>
                <input type="text" name="" id="" placeholder="your link" />
              </div>
            </div>
          </div>
        </div>
        <button class="btn-save">Save</button>
      </div>
      <!-- customerInfo -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import HeaderVue from './layouts/homeFragment/Header.vue'
import FooterVue from '~/components/layouts/Footer.vue'
let exInfo = ref(true)
const avatarImage =
  'https://st2.depositphotos.com/2777531/6506/v/450/depositphotos_65061729-stock-illustration-man-avatar-user-picture.jpg'
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  // font-family: ;
}
:root {
  --main-color: #b9cec7;
  --font: Roboto;
  --btn-color: #ffffff;
  --background-color: #ffffff;
}
.wrap {
  height: 100%;
  width: 100%;
}
.Infor-main {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  min-height: 300px;
  opacity: 0.95;
  background-color: var(--background-color);
  border-radius: 20px;
  width: 95%;
  margin: 0 auto;
  margin-bottom: 15px;
  margin-top: -50px;
  padding: 100px;
  text-align: center;

  //
  // position: relative;
  // top: 482px;
  // left: 25px;
  // right: 25px;
  // bottom: 10%;
}
.update-profile {
  background: var(--main-color);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  font-family: var(--font);
  font-style: normal;
  font-weight: 300;
  font-size: 25px;
  line-height: 32px;
  border: none;
  width: 400px;
  height: 55px;
  margin: auto 50px;
  // display: flex;
  // align-items: center;
  // align-self: center;
}

.check-box-form {
  font-family: var(--font);
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  // font-size: 25px;
  margin: 50px;
  background-color: var(--main-color);
  display: flex;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  height: 50px;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
}

// expertInfoForm
.infor_necessary {
  display: flex;
  background-color: var(--main-color);
  border-radius: 10px;
  min-height: 300px;
  padding: 50px;
}

.infor_necessary-left {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: center;
  // margin-right: -30px;
  // background-color: rgb(228, 149, 149);
}
.info_avatar {
  height: 230px;
  width: 210px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 15px;
}
.btn_upload-photo {
  background-color: var(--btn-color);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 7px;
  border: none;
  width: 180px;
  height: 30px;
  margin-top: 10px;
  margin-left: 15px;
}
// right
.infor_necessary-right {
  flex: 5;
  padding-left: 10px;
  // padding-top: 0;
  // padding-bottom: 0;
  // background-color: rgb(223, 163, 163);
  display: flex;
  flex-direction: column;
  // align-items: stretch;
  // align-self: stretch;
  // align-content: stretch;
  justify-content: space-around;
  align-items: stretch;
}
.row-input {
  // background-color: red;
  display: flex;
}
.label-form {
  margin-top: 4px;
  min-width: 96px;
  text-align: left;
}
.Info-block3-bottom-part input,
.field-info input,
.infor_necessary-right input {
  border: none;
  outline: none;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 7px;
  height: 30px;
  flex: 1;
  padding-left: 5px;
}
// block 2
.field-info {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  // justify-content: space-around;
  justify-content: space-around;
  align-items: stretch;
  // align-content: space-between;
  // align-items: space-evenly;
  background-color: var(--main-color);
  border-radius: 10px;
  min-height: 350px;
  padding: 50px;
}
.input-infoProject {
  min-height: 96px;
  line-height: 100px;
}
.textarea-infoProject {
  border: none;
  outline: none;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 7px;
  padding: 10px;
}
// block 3
.Info-block3 {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  // justify-content: space-around;
  // align-items: stretch;
  background-color: var(--main-color);
  border-radius: 10px;
  min-height: 350px;
  padding: 50px;
}
.Info-block3-txtarea {
  margin-bottom: 20px;
}
.Info-block3-bottom-part {
  display: flex;
  height: 80px;
  justify-content: flex-start;
}
.Infor-block3-column {
  // background-color: red;
  flex: 10;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.Infor-block3-column-2 {
  flex: 2;
}
.btn-save {
  margin-top: 10px;
  outline: none;
  border: none;
  width: 251px;
  height: 58px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 7px;
  background-color: var(--main-color);
  font-family: var(--font);
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 28px;
}
</style>
