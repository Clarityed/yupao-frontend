<template>
  <van-cell center title="匹配模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode" size="24" />
    </template>
  </van-cell>
  <user-card-list :user-list="userList" :loading="loading" />
  <van-empty v-if="!userList || userList.length < 1" description="数据为空" />
</template>

<script setup lang="ts">

import {ref, watchEffect} from "vue";
import myAxios from "../plugins/MyAxios"; // 这里最新的 ts 语法，可能在标签里声明 ts 语言之后这里文件可以不用 .ts 结尾
import {Toast} from "vant";
import UserCardList from "../components/UserCardList.vue";
import {UserType} from "../models/user";

// 用于判断现在处于什么模式的参数
const isMatchMode = ref<boolean>(false)

const userList = ref([{},{},{},{},{}]);
// 判断是否显示骨架屏
const loading = ref(false);

/**
 * 加载数据
 */
let loadData = async () => {
  let userListData;
  loading.value = true;
  // 匹配模式，根据标签匹配用户
  if (isMatchMode.value) {
    const num = 10;
    userListData = await myAxios.get('/user/match', {
      params: {
        num
      },
    })
        .then(function (response) {
          console.log('/user/match succeed', response);
          Toast.success('请求成功');
          // 请求成功后要把数据返回，渲染到页面上
          return response?.data;
        })
        .catch(function (error) {
          console.error('/user/match error', error);
          Toast.fail('请求失败');
        })
  } else {
    // 普通模式，分页查询用户
    // 上述请求也可以按以下方式完成（可选）
    // await 等待数据都传输完毕之后返回
    userListData = await myAxios.get('/user/recommend', {
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
    }
  if (userListData) {
    userListData.forEach((user: UserType)  => {
      if (user.tags) {
        // 这里是后端传来的是 Json 字符串，我们需要的是数组，这里我们可以使用 JSON.parse(user.tags) 来转成数组
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
  loading.value = false;
}

// 这里不是很懂
watchEffect(() => {
  loadData();
})

// 钩子函数，用于加载完 dom 元素完之后要向后端发送请求并接收响应
/*onMounted(async () => {

})*/
/*import {useRoute} from 'vue-router';
const route = useRoute();
const { list } = route.query;
console.log(list);*/
</script>

<style scoped>

</style>