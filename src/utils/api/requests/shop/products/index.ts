import type { FetchesRequestConfig } from '@siberiacancode/fetches'

import { api } from '@/utils/api/instance'

export type GetShopProductsRequestConfig = FetchesRequestConfig

export const getShopProducts = ({ config }: GetShopProductsRequestConfig = {}) =>
	api.get<Product[]>('/shop/products', config)
