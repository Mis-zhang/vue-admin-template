import { createRouter, createWebHistory } from 'vue-router';

/** 默认布局 */
const Layout = () => import('@/layout/index.vue');

/** 静态路由 */
export const constantRoutes = [
	{
		path: '/redirect',
		component: Layout,
		meta: { hidden: true },
		children: [
			{
				path: '/redirect/:path(.*)',
				component: () => import('@/views/redirect/index.vue'),
			},
		],
	},
	{
		path: '/login',
		component: () => import('@/views/login/index.vue'),
		meta: { hidden: true },
	},
	{
		path: '/:pathMatch(.*)*',
		component: () => import('@/views/error/404.vue'),
		meta: { hidden: true },
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: constantRoutes,
	scrollBehavior: () => ({ left: 0, top: 0 }),
});

/**
 * @description 重置路由
 * @description 注意：所有动态路由路由必须带有name属性，否则可能会不能完全重置干净
 */
export function resetRouter() {
	try {
		const routeStore = useRouteStore();
		routeStore.asyncRoutes.forEach(route => {
			const { name } = route;
			if (name) {
				router.hasRoute(name) && router.removeRoute(name);
			}
		});
	} catch (error) {
		// 强制刷新浏览器也行，只是交互体验不是很好
		window.location.reload();
	}
}

export default router;
