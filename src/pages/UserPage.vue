<template>
  <template v-if="user">
    <van-cell title="昵称" is-link to="/user/edit" :value="user.username" @click="toEdit('username', '昵称', user.username)" />
    <van-cell title="账号" :value="user.userAccount" />
    <van-cell title="头像" is-link to="/user/edit">
      <img style="height: 48px" :src="user.avatarUrl" />
    </van-cell>
    <van-cell title="性别" is-link to="/user/edit" :value="user.gender" @click="toEdit('gender', '性别', user.gender)" />
    <van-cell title="电话" is-link to="/user/edit" :value="user.phone" @click="toEdit('phone', '电话', user.phone)" />
    <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" @click="toEdit('email', '邮箱', user.email)" />
    <van-cell title="用户编号" :value="user.userCode"  />
    <van-cell title="注册时间" :value="user.createTime" />
  </template>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/MyAxios";
import {Toast} from "vant/es";
import {getCurrentUser} from "../services/user";

/*const user = {
  id: 1,
  username: '清澈',
  userAccount: 'clarity',
  avatarUrl: 'https://img2.huashi6.com/images/resource/thumbnail/2022/03/10/271_22109410029.jpg?imageMogr2/quality/75/interlace/1/thumbnail/700x/gravity/North/crop/700x794/format/webp',
  gender: '男',
  phone: '18759190103',
  email: '2270893459@qq.com',
  createTime: new Date(),
  userCode: '12334',
};*/

const user = ref();

onMounted(async () => {
  user.value = await getCurrentUser();
})

const router = useRouter();

const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue
    }
  })
}

</script>

<style scoped>

</style>