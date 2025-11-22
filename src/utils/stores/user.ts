import { reactive, readonly } from 'vue'

interface UserStore {
	user: User | null
}

const state = reactive<UserStore>({ user: null })
const userStore = readonly<UserStore>(state)

const actions = {
	setUser: (payload: User) => (state.user = payload),
	logout: () => (state.user = null),
}

export const useUserStore = () => ({ state: userStore, actions })
