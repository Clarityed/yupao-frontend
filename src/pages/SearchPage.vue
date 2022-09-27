<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入要搜索的标签"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>

  <van-divider content-position="left">已选标签</van-divider>
  <!-- 判断是否有选中标签，如果有则隐藏该内容 -->
  <div v-if="activeIds.length === 0">请选择标签</div>
  <van-space wrap>
    <!-- 遍历所有标签 -->
    <van-tag v-for="tag in activeIds" closeable size="small" type="primary" @close="doClose(tag)">
     {{ tag }}
    </van-tag>
  </van-space>
  <van-divider content-position="left">选择标签</van-divider>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />
  <div style="padding: 12px;">
    <van-button block type="primary" @click="doSearchResult">搜索</van-button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {useRouter} from "vue-router";

const router = useRouter();

// 定义变量，已选择的标签
const activeIds = ref([]);
const activeIndex = ref(0);

const searchText = ref('');

// 标签列表
// 此处 id 为标签是为了更加方便的操作
// 原标签列表数据
const originTagList = [
  {
    text: '性别',
    children: [
      { text: '男', id: '男' },
      { text: '女', id: '女' },
    ],
  },
  {
    text: '年级',
    children: [
      { text: '大一', id: '大一' },
      { text: '大二', id: '大二' },
      { text: '大三', id: '大三' },
      { text: '研一', id: '研一' },
      { text: '研二', id: '研二' },
      { text: '研三', id: '研三' },
      { text: '博士', id: '博士' },
      { text: '博士后', id: '博士后' },
    ],
  },
  {
    text: '兴趣',
    children: [
      { text: '音乐', id: '音乐' },
      { text: '游戏', id: '游戏' },
      { text: '跑步', id: '跑步' },
      { text: '篮球', id: '篮球' },
      { text: '爬山', id: '爬山' },
      { text: '旅游', id: '旅游' },
    ],
  },
];

// 标签列表
let tagList = ref(originTagList);

/**
 * 搜索过滤
 * @param val
 * @returns {ToastWrapperInstance}
 */
const onSearch = (val) => {
  tagList.value = originTagList.map(parentTag => {
    const tempChildren = [...parentTag.children];
    const tempParentTag = {...parentTag};
    tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
    return tempParentTag;
  });
};

const onCancel = () => {
  searchText.value = '';
  tagList.value = originTagList;
};

// 移除标签
const doClose = (tag) => {
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag;
  })
}

/**
 * 搜索用户
 */
const doSearchResult = () => {
  router.push({
    path: '/user/list',
    query: {
      tags: activeIds.value
    }
  })
}

</script>

<style scoped>

</style>