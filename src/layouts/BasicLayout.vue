<template>
  <van-nav-bar
      :title="title"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <!-- 使用Vue插槽来修改样式 -->
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>
  <div id="content">
    <router-view/>
  </div>
  <van-tabbar route @change="onChange">
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
  import {Toast} from "vant";
  import {useRouter} from "vue-router"
  import {ref} from "vue";
  import routes from "../config/route";

  const router = useRouter();
  // 默认标题
  const DEFAULT_TITLE = '伙伴匹配';
  const title = ref(DEFAULT_TITLE);
  router.beforeEach((to, from) => {
    const toPath = to.path;
    // 变量所以路由，找到当前页面所对应的
    const route = routes.find((route) => {
      return toPath == route.path;
    })

    if (!route?.title) {
      title.value = DEFAULT_TITLE;
    } else {
      title.value = route.title;
    }
  })

  const onClickLeft = () => {
    router.back();
  };
  const onClickRight = () => {
    router.push('/search');
  };

  const onChange = (index) => Toast(`标签 ${index}`);
</script>

<style scoped>
#content {
  padding-bottom: 50px;
}
</style>