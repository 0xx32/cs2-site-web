import fetches from '@siberiacancode/fetches'

import { API_URL } from '@/utils/constants/global'

export const api = fetches.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})
