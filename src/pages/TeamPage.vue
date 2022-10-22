<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch"  />
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="公开" name="public" />
      <van-tab title="加密" name="secret" />
    </van-tabs>
    <div style="margin-bottom: 16px;" />
    <team-card-list :team-list="teamList"/>
    <van-empty v-if="teamList?.length < 1" description="数据为空" />
    <van-button class="add-button" icon="plus" type="primary" @click="doAddTeam" />
  </div>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/MyAxios";
import {Toast} from "vant";

const router = useRouter();

const doAddTeam = () => {
  router.push({
    path: "/team/add"
  });
}

// 搜索关键词
const searchText = ref("");
// 切换标签的初始值
const active = ref(0);
/**
 * 标签页切换
 * @param name
 */
const onTabChange = (name: string) => {
  if (name === 'public') {
    searchTeam(searchText.value, 0);
  } else {
    searchTeam(searchText.value, 2);
  }
}

// 队伍列表初始值
const teamList = ref([]);

/**
 * 搜索队伍列表
 * @param val 关键字搜索词
 * @param status 队伍状态
 */
const searchTeam = async (val = '', status = 0) => {
  const res = await myAxios.get('/team/list', {
    params: {
      searchText: val,
      pageNum: 1,
      status,
    }
  });
  if (res.code === 0) {
    teamList.value = res.data;
  } else {
    Toast.fail('加载队伍失败，请刷新重试');
  }
}

const onSearch =  (val:string) => {
  searchTeam(val);
}

onMounted(() => {
  searchTeam('');
})



</script>

<style scoped>

</style>