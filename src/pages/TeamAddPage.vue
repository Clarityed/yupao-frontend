<template>
<div id="teamAddPage">
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="addTeamData.name"
          name="name"
          label="队伍名称"
          placeholder="队伍名称"
          :rules="[{ required: true, message: '请填写队伍名称' }]"
      />
      <van-field
          v-model="addTeamData.description"
          rows="4"
          autosize
          label="队伍描述"
          type="textarea"
          placeholder="请输入队伍描述"
      />
      <van-field
          v-model="result"
          is-link
          readonly
          name="datetimePicker"
          label="过期时间"
          placeholder="点击选择过期时间"
          @click="showPicker = true"
      />
      <van-popup v-model:show="showPicker" position="bottom">
        <van-datetime-picker
            v-model="addTeamData.expireTime"
            type="datetime"
            title="选择过期时间"
            @confirm="onConfirm"
            @cancel="showPicker = false"
            :min-date="minDate"
        />
      </van-popup>
      <van-field name="stepper" label="最大人数">
        <template #input>
          <van-stepper v-model="addTeamData.maxNum" max="20"/>
        </template>
      </van-field>
      <van-field name="radio" label="队伍状态">
        <template #input>
          <van-radio-group v-model="addTeamData.status" direction="horizontal">
            <van-radio name="0">公开</van-radio>
            <van-radio name="1">私有</van-radio>
            <van-radio name="2">加密</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
          v-if="Number(addTeamData.status) === 2 "
          v-model="addTeamData.password"
          type="password"
          name="password"
          label="队伍密码"
          placeholder="队伍密码"
          :rules="[{ required: true, message: '请填写队伍密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
  <!-- 查看对象最简单的方式 -->
<!--
  {{ addTeamData }}
-->
</div>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/MyAxios";
import {Toast} from "vant";

const router = useRouter();

const initFormData = {
  "name": "",
  "description": "",
  "expireTime": null,
  "maxNum": 1,
  "password": "",
  "status": 0,
}

// 用户填写表单数据
// ... 这三个点表示扩展符，使其 initFormData 不被用户填写的值改变
const addTeamData = ref({...initFormData})

const result = ref('');
const showPicker = ref(false);
const onConfirm = (value: string) => {
  result.value = value;
  showPicker.value = false;
};

// 加载当前时间
const minDate = ref(new Date());

// 提交数据到后端
const onSubmit = async () => {
  // 我们后端接收的 status 是数字类型，前端表单出来的是字符类型
  const postData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status)
  }
  // todo 前端参数检验
  const res = await myAxios.post("/team/add", postData);
  if (res?.code === 0 && res.data) {
    Toast.success('创建队伍成功');
    router.push({
      path: '/team',
      replace: true
    })
  } else {
    Toast.fail('创建队伍失败');
  }
}
</script>

<style scoped>

</style>