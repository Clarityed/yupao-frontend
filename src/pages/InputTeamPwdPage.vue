<template>
  <div class="inputTeamPwdPage">
    <van-field label="队伍密码" v-model="password"  type="password" placeholder="请输入队伍密码"></van-field>
    <van-button class="submit-button " type="primary" size="normal" @click="doJoinTeam(teamId)">提交</van-button>
  </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {Toast} from "vant";
import myAxios from "../plugins/MyAxios";
import {ref} from "vue";

const router = useRouter();
const route = useRoute();
const teamId = parseInt(route.query.id);

const password = ref('');

/**
 * 加入队伍
 * @param id
 */
const doJoinTeam = async (id: number) => {
  const res = await myAxios.post('/team/join', {
    teamId: id,
    password: password.value
  });
  if (res?.code === 0) {
    Toast.success('加入成功');
    router.push({
      path: '/user/team/join',
      replace: true
    })
  } else {
    Toast.fail('加入失败' + (res.description ? `，${res.description}` : ``));
  }
}

</script>

<style scoped>

</style>