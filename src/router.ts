import { createMemoryHistory, createRouter } from 'vue-router'

import MainPage from '@/pages/main/main-page.vue'

const routes = [{ path: '/', component: MainPage }]

export const router = createRouter({
	history: createMemoryHistory(),
	routes,
})
