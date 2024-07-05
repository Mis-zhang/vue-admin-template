import { createApp } from 'vue';
import App from './App.vue';
// 导入 vue-router
import router from '@/router';
// 导入 pinia 状态管理库
import pinia from '@/stores';
// 设置 Arco 组件全局一些配置
import { Card, Modal } from '@arco-design/web-vue';
// 导入 Arco Ui 库 自定义样式
import '@/styles/arco-ui/index.less';
// 导入全局 scss 主文件
import '@/styles/index.scss';
// 导入 animate.css 动画库
import 'animate.css/animate.min.css';
// 导入自定义过度动画
import '@/styles/css/transition.css';

// 支持SVG
import 'virtual:svg-icons-register';

const app = createApp(App);
Card.props.bordered = false;
Modal._context = app._context;

app.use(router);
app.use(pinia);
app.mount('#app');
