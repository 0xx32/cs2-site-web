import { createApp } from 'vue'

import { getAuthMe } from '@/utils/api/requests'
import { useUser } from '@/utils/stores/useUser'

import App from './App.vue'
import { router } from './router'

import '@/assets/styles/global.css'

const setup = async () => {
	const { setUser, logout } = useUser()
	const authMeQuery = await getAuthMe({
		config: {
			credentials: 'include',
		},
	}).catch(() => logout())

	if (authMeQuery) {
		setUser(authMeQuery.data)
	}

	createApp(App).use(router).mount('#app')
}

setup()
