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
        <van-button size="mini" type="primary" v-if="team.createUser.id !== currentUser?.id && !team.hasJoin" plain
                    @click="doJoinTeam(team.id)">加入队伍</van-button>
        <van-button v-if="team.createUser.id === currentUser?.id" size="mini"  plain
                    @click="doUpdateTeam(team.id)">更新队伍</van-button>
        <van-button size="mini" v-if="team.hasJoin" plain
                    @click="doQuitTeam(team.id)">退出队伍</van-button>
        <van-button v-if="team.createUser.id === currentUser?.id" size="mini" type="danger"  plain
                    @click="doDeleteTeam(team.id)">解散队伍</van-button>
      </template>
    </van-card>
  </div>
</template>

<script setup lang="ts">
import defaultAvatar from "../assets/keqing_WebStormB.jpeg";
import {TeamType} from "../models/team";
import { teamStatusEnum } from "../constants/team"
import myAxios from "../plugins/MyAxios";
import {Toast} from "vant";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user";
import {useRouter} from "vue-router";
const router = useRouter();

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

// 获取当前登录用户，用于判断是否可以更新队伍信息
const currentUser = ref();
onMounted(async () => {
  currentUser.value = await getCurrentUser();
})

// 更新按钮实现带参数跳转
const doUpdateTeam = async (id: number) => {
  router.push({
    path: '/team/update',
    query: {
      id
    }
  })
}

/**
 * 退出队伍
 * @param id
 */
const doQuitTeam = async (id: number) => {
  const res = await myAxios.post('/team/quit', {
    teamId: id
  });
  if (res.code === 0) {
    Toast.success('操作成功');
  } else {
    Toast.fail('操作失败');
  }
}

/**
 * 解散队伍
 * @param id
 */
const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post('/team/delete', {
    teamId: id
  });
  if (res.code === 0) {
    Toast.success('操作成功');
  } else {
    Toast.fail('操作失败');
  }
}

</script>

<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 128px;
  object-fit: unset;
}
</style>