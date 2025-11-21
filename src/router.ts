import type { RouteRecordRaw } from 'vue-router'

import { createRouter, createWebHistory } from 'vue-router'

import { APP_ROUTES, APP_ROUTES_NAMES } from './utils/constants/routes'

const routes: RouteRecordRaw[] = [
	{
		path: APP_ROUTES.MAIN,
		name: APP_ROUTES_NAMES.MAIN,
		component: () => import('@/pages/main/main-page.vue'),
	},
	{
		path: APP_ROUTES.SHOP,
		redirect: { name: APP_ROUTES_NAMES.SHOP, params: { tab: 'privileges' } },
	},
	{
		path: `${APP_ROUTES.SHOP}/:tab?`,
		name: APP_ROUTES_NAMES.SHOP,
		component: () => import('@/pages/shop/shop.page.vue'),
		props: true,
	},
]

export const router = createRouter({
	history: createWebHistory(),
	routes,
})
