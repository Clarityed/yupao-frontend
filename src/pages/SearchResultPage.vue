<template>
  <user-card-list :user-list="userList" />
  <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空" />
</template>

<script setup>

import {useRoute} from 'vue-router';
import {onMounted, ref} from "vue";
import myAxios from "../plugins/MyAxios.ts";
import {Toast} from "vant";
import QS from 'qs'
import UserCardList from "../components/UserCardList.vue";


const route = useRoute();

const { tags } = route.query;
console.log(tags)

const userList = ref([]);

// 钩子函数，用于加载完 dom 元素完之后要向后端发送请求并接收响应
onMounted(async () => {
  // 上述请求也可以按以下方式完成（可选）
  // await 等待数据都传输完毕之后返回
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList: tags
    },
    paramsSerializer: function (params) {
      return QS.stringify(params, {indices: false})
    }
  })
      .then(function (response) {
        console.log('/user/search/tags succeed', response);
        Toast.success('请求成功');
        // 请求成功后要把数据返回，渲染到页面上
        return response?.data;
      })
      .catch(function (error) {
        console.error('/user/search/tags error', error);
        Toast.fail('请求失败');
      })
  // 在不知道对象哪里存放数据时，我们可以打印一个完整的对象查看它数据存储的位置
  console.log(userListData)
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        // 这里是后端传来的是 Json 字符串，我们需要的是数组，这里我们可以使用 JSON.parse(user.tags) 来转成数组
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
})

// 模拟用户数据
/*const mockUser = {
  id: 1,
  username: '清澈',
  userAccount: 'clarity',
  avatarUrl: 'https://img2.huashi6.com/images/resource/thumbnail/2022/03/10/271_22109410029.jpg?imageMogr2/quality/75/interlace/1/thumbnail/700x/gravity/North/crop/700x794/format/webp',
  userProfile: '一名大四的学生，面对毕业找工作的压力，现在在疯狂学习就业的知识',
  gender: 0,
  phone: '18728374653',
  email: '21312331232@qq.com',
  userRole: 1,
  createTime: new Date(),
  userCode: '1233',
  tags: ['java', 'c++', 'python', 'c', 'go'],
}*/
</script>

<style scoped>

</style>