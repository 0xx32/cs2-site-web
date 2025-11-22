import type { FetchesRequestConfig } from '@siberiacancode/fetches'

import { api } from '@/utils/api/instance'

export type GetShopItemsRequestConfig = FetchesRequestConfig

export const getShopItems = ({ config }: GetShopItemsRequestConfig = {}) =>
	api.get<GetShopItemsResponse>('/shop/items', config)
