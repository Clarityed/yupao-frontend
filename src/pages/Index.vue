<template>
  <user-card-list :user-list="userList" />
  <van-empty v-if="!userList || userList.length < 1" description="数据为空" />
</template>

<script setup>

import {useRoute} from 'vue-router';
import {onMounted, ref} from "vue";
import myAxios from "../plugins/MyAxios.ts";
import {Toast} from "vant";
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();

const { list } = route.query;
console.log(list);

const userList = ref([]);

// 钩子函数，用于加载完 dom 元素完之后要向后端发送请求并接收响应
onMounted(async () => {
  // 上述请求也可以按以下方式完成（可选）
  // await 等待数据都传输完毕之后返回
  const userListData = await myAxios.get('/user/recommend', {
    params: {
      pageSize: 8,
      pageNum: 1
    },
  })
      .then(function (response) {
        console.log('/user/search/tags succeed', response);
        Toast.success('请求成功');
        // 请求成功后要把数据返回，渲染到页面上
        return response?.data?.records;
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
</script>

<style scoped>

</style>