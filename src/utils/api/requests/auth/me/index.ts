import type { FetchesRequestConfig } from '@siberiacancode/fetches'

import { api } from '@/utils/api/instance'

export type GetAuthMeRequestConfig = FetchesRequestConfig

export const getAuthMe = ({ config }: GetAuthMeRequestConfig = {}) =>
	api.get<{ user: User }>('/auth/me', config)
