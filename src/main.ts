import { VueQueryPlugin } from '@tanstack/vue-query'
import { createApp } from 'vue'

import { getAuthMe } from '@/utils/api/requests'
import { useUserStore } from '@/utils/stores/user'

import App from './App.vue'
import { router } from './router'

import '@/assets/styles/global.css'

const setup = async () => {
	const userStore = useUserStore()
	const authMeQuery = await getAuthMe({
		config: {
			credentials: 'include',
		},
	}).catch(() => userStore.actions.logout())

	if (authMeQuery) {
		userStore.actions.setUser(authMeQuery.data.user)
	}

	createApp(App).use(router).use(VueQueryPlugin).mount('#app')
}

setup()
