import { createRouter, createWebHistory } from 'vue-router';

const Layout = () => import('@/layout/index.vue');

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [],
	scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router;
