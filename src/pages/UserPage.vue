<template>
  <div id="userPage">
    <van-cell title="当前用户昵称" :value="user?.username" />
    <van-cell title="修改个人信息" is-link to="/user/update" />
    <van-cell title="我的创建队伍" is-link to="/user/team/create" />
    <van-cell title="我的加入队伍" is-link to="/user/team/join" />
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user";

const user = ref();

onMounted(async () => {
  user.value = await getCurrentUser();
})
</script>

<style scoped>

</style>