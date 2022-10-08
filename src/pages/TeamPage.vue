<template>
  <div id="teamPage">
    <van-button type="primary" @click="doJoinTeam">创建队伍</van-button>
    <team-card-list :team-list="teamList"/>
  </div>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/MyAxios";
import {Toast} from "vant";

const router = useRouter();

const doJoinTeam = () => {
  router.push({
    path: "/team/add"
  });
}

const teamList = ref([]);

onMounted(async () => {
  const res = await myAxios.get('/team/list');
  if (res.code === 0) {
    teamList.value = res.data;
  } else {
    Toast.fail('加载队伍失败，请刷新重试');
  }
})

</script>

<style scoped>

</style>