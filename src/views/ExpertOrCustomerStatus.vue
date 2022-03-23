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
        <div class="infor_necessary mb-[10px]">
          <div class="infor_necessary-left">
            <img v-if="changeimg" :src="avatarImage" alt="" class="info_avatar" />
            <img v-else :src="aavatarImage" alt="" class="info_avatar" />
          </div>
          <div class="infor_necessary-right">
            <div class="row-input">
              <label class="label-form" for="">Full name:</label>
              <input type="text" v-model="fullname" id="" placeholder="TRINH KHANH HUYEN" />
            </div>
            <div class="row-input">
              <label class="label-form" for="">Gender:</label>
              <el-select style="width: 100%" v-model="gender" placeholder="Select" size="large">
                <el-option v-for="gender in GenderArr" :label="gender.label" :value="gender.value"> </el-option>
              </el-select>
            </div>
            <div class="row-input">
              <label class="label-form" for="">Birth:</label>
              <input type="text" v-model="birth" id="" placeholder="28/08/2001" />
            </div>
            <div class="row-input">
              <label class="label-form" for="">Phone:</label>
              <input type="text" v-model="phone" id="" placeholder="0987 332 991" />
            </div>
            <div class="row-input">
              <label class="label-form" for="">Address:</label>
              <input type="text" v-model="address" id="" placeholder="NEU, 207 Giai Phong, Hai Ba Trung, Ha Hoi" />
            </div>
            <div class="row-input">
              <label class="label-form" for="">Email:</label>
              <input type="text" v-model="email" id="" placeholder="tkhuyen@gmail.com" />
            </div>
            <div class="row-input">
              <label class="label-form" for="">Interest:</label>
              <input type="text" v-model="interest" id="" />
            </div>

            <div class="row-input">
              <label class="label-form" for="">Link avatar:</label>
              <input @change="changeImgAvatar()" type="text" v-model="linkAvatar" id="" />
            </div>
          </div>
        </div>
        <div v-if="exInfo" class="field-info mb-[10px]">
          <div class="row-input mb-[10px]">
            <label class="label-form" for="">Link Profile:</label>
            <input type="text" v-model="LinkProfile" id="" />
          </div>
          <div class="row-input mb-[10px]">
            <label class="label-form" for="">Research area:</label>
            <el-select style="width: 100%" v-model="ResearchArea" placeholder="Select" size="large">
              <el-option v-for="fields in fieldsArr" :key="fields.name" :label="fields.name" :value="fields.name">
              </el-option>
            </el-select>
            <!-- <input type="text" name="address" id="" placeholder="NEU, 207 Giai Phong, Hai Ba Trung, Ha Hoi" /> -->
          </div>
          <div class="row-input mb-[10px]">
            <label class="label-form" for="">Degree:</label>
            <el-select style="width: 100%" v-model="Degree" placeholder="Select" size="large">
              <el-option v-for="degree in DegreeArr" :value="degree"> </el-option>
            </el-select>
          </div>
          <div class="row-input mb-[10px]">
            <label class="label-form" for="">Company:</label>
            <input type="text" v-model="Company" name="interest" id="" />
          </div>
        </div>

        <el-button
          size="large"
          class="w-[200px] text-lg"
          color="#b9cec7"
          @click="handlePost(), (centerDialogVisible = true)"
          type="primary"
          ><span class="text-lg">Save</span></el-button
        >
      </div>
      <!-- customerInfo -->
    </div>
    <!-- thông báo save thành công -->
    <el-dialog v-model="centerDialogVisible" title="Warning" width="30%" center>
      <span v-if="failLog">Fail to update your profile!</span>
      <span v-else>Update your profile successfully!</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">Return</el-button>
          <router-link to="/">
            <el-button type="primary" @click="centerDialogVisible = false">Back to Homepage</el-button>
          </router-link>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, onUpdated, ref } from 'vue'
import { getFields } from '~/api/Fields'
import { Fields } from '~/models/Fields'
import { useStore } from '~/store/index'
import axios from 'axios'
let exInfo = ref(true)
let centerDialogVisible = ref(false)
let fullname = ref('')
let gender = ref('')
let birth = ref('')
let phone = ref('')
let address = ref('')
let email = ref('')
let interest = ref('')
let linkAvatar = ref('')
const ResearchArea = ref([])
const Degree = ref([])
let Company = ref('')
let LinkProfile = ref('')
// let linkAvatar = ref('')
// let linkAvatar = ref('')
const store = useStore()
const failLog = ref(false)
const handlePost = async () => {
  console.log(store.state.auth.token)
  console.log(birth.value)
  console.log(exInfo.value)

  const headers = {
    Authorization: `Bearer ${store.state.auth.token}`
  }
  try {
    if (exInfo.value) {
      await axios.post(
        '/experts',
        {
          score: 0,
          img: linkAvatar.value,
          other_link: '',
          address: [address.value],
          gender: gender.value,
          degree: Degree.value,
          birth: birth.value,
          phone: phone.value,
          name: fullname.value,
          research_area: [ResearchArea.value],
          company: Company.value,
          location: {},
          email: email.value,
          link_profile: LinkProfile.value,
          uid: store.state.auth.userid
        },
        {
          headers
        }
      )
      await axios.put(
        `/users/${store.state.auth.userid}`,
        {
          role: 'EXPERT'
        },
        {
          headers
        }
      )
    } else {
      await axios.post(
        '/customers',
        {
          uid: store.state.auth.userid,
          gender: gender.value,
          birth: birth.value,
          phone: phone.value,
          address: address.value,
          email: email.value,
          image: linkAvatar.value,
          interest: interest.value,
          website: '',
          facebook: '',
          linkedIn: 'string',
          desc: Company.value,
          role: 'CUSTOMER'
        },
        {
          headers
        }
      )
      await axios.put(
        `/users/${store.state.auth.userid}`,
        {
          role: 'CUSTOMER'
        },
        {
          headers
        }
      )
    }
  } catch (error) {
    failLog.value = true
    console.log(error)
  }
}
let avatarImage =
  'https://st2.depositphotos.com/2777531/6506/v/450/depositphotos_65061729-stock-illustration-man-avatar-user-picture.jpg'
let aavatarImage = computed(() => {
  return linkAvatar.value
})
let changeimg = ref(true)
const changeImgAvatar = () => {
  changeimg.value = false
  avatarImage = linkAvatar.value
}
const DegreeArr = ref<String[]>([])
const fieldsArr = ref<Fields[]>([])
const GenderArr = [
  {
    value: '0',
    label: 'Male'
  },
  {
    value: '1',
    label: 'Female'
  },
  {
    value: '2',
    label: 'Other'
  }
]
onMounted(async () => {
  fieldsArr.value = await getFields()
  DegreeArr.value = ['PGS', 'TS', 'ThS', 'Cử nhân']
  // console.log(store.state.auth.token)
})
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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
  min-height: 500px;
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
  min-width: 115px;
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
  height: 40px;
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
  height: 100px;
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
