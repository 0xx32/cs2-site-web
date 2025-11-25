import type { FetchesRequestConfig } from '@siberiacancode/fetches'

import { api } from '@/utils/api/instance'

export type DeleteCartRequestConfig = FetchesRequestConfig
export const deleteCart = ({ config }: DeleteCartRequestConfig) =>
	api.delete('/cart', {
		...config,
		credentials: 'include',
	})
