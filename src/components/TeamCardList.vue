<template>
  <div id="teamCardList">
    <van-card
        v-for="team in props.teamList"
        :desc="team.description"
        :title="`${team.name}`"
        :thumb="defaultAvatar"
    >
      <template #tags>
        <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px">
          {{ teamStatusEnum[team.status] }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{ '最大人数：' + team.maxNum}}
        </div>
        <div v-if="team.expireTime">
          {{ '过期时间：' + team.expireTime}}
        </div>
        <div>
          {{ '创建时间：' + team.createTime}}
        </div>
      </template>
      <template #footer>
        <van-button size="small" type="primary" plain @click="doJoinTeam(team.id)">加入队伍</van-button>
      </template>
    </van-card>
  </div>
</template>

<script setup lang="ts">
import defaultAvatar from "../assets/keqing_WebStormB.jpeg";
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team"
import myAxios from "../plugins/MyAxios";
import {Toast} from "vant";

interface TeamCardListProps {
  teamList: TeamType[]
}

const props = withDefaults(defineProps<TeamCardListProps>(), {
  // @ts-ignore
  // 这里可能书写不规范，以后排除问题时要注意
  teamList: [] as TeamType[],
})

const doJoinTeam = async (id: number) => {
  const res = await myAxios.post('/team/join', {
    teamId: id
  })
  if (res?.code === 0) {
    Toast.success('加入成功');
  } else {
    Toast.fail('加入失败' + (res.description ? `，${res.description}` : ``));
  }
}

</script>

<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 128px;
  object-fit: unset;
}
</style>