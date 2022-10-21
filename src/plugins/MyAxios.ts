import axios from "axios";

const myAxios = axios.create({
    baseURL: 'http://localhost:8081/api',
});

myAxios.defaults.withCredentials = true;// 设置前端携带 Cookie

// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    console.log('我要发请求啦', config)
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    console.log('我收到你的响应啦', response)
    if (response?.data?.code === 40100) {
        // 获取当前页面的地址
        const redirectUrl = window.location.href;
        // 拼接到登录成功后即将跳转的地址后面，``这一对符号是模板字符串
        window.location.href = `/user/login?redirect=${redirectUrl}`;
    }
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // 响应返回出来的是数据，我们只关注业务层
    return response.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default myAxios;