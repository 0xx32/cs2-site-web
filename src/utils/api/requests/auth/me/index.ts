import type { FetchesRequestConfig } from '@siberiacancode/fetches'

import type { User } from '@/utils/api/types'

import { api } from '@/utils/api/instance'

export type GetAuthMeRequestConfig = FetchesRequestConfig

export const getAuthMe = ({ config }: GetAuthMeRequestConfig = {}) =>
	api.get<User>('/auth/me', config)
