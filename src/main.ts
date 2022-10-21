import { createApp } from 'vue'
import App from './App.vue'
import * as VueRouter from 'vue-router'
// 1. 引入你需要的组件
import Vant from 'vant';
import 'vant/lib/index.css';
import routes from "./config/route";
// 2. 引入组件样式
import 'vant/lib/index.css';

const app = createApp(App);
// 3. 注册你需要的组件
app.use(Vant);

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHistory(),
    routes, // `routes: routes` 的缩写
})
//确保 _use_ 路由实例使
//整个应用支持路由。
app.use(router)

app.mount('#app') // mount 挂载


