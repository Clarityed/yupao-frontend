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
import {useRouter} from "vue-router";

const router = useRouter();

const user = ref();

onMounted(async () => {
  user.value = await getCurrentUser();
  // 这样配置重定向很麻烦，我们必须在每个获取当前用户信息都用上这个逻辑
/*  if (!user.value) {
    router.replace("/user/login");
  }*/
})
</script>

<style scoped>

</style>