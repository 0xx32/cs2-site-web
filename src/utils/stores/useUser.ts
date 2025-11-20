import { ref } from 'vue'

import type { User } from '@/utils/api/types'

const user = ref<User | null>(null)

export const useUser = () => {
	const setUser = (payload: User) => (user.value = payload)
	const logout = () => (user.value = null)

	return { user, setUser, logout }
}
