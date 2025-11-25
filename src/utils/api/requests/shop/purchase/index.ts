import type { FetchesRequestConfig } from '@siberiacancode/fetches'

import { api } from '@/utils/api/instance'

type PostShopPurchaseParams = {
	productId: number
	productVariantId: number
	serverId: number
}[]

export type GetShopPurchaseRequestConfig = FetchesRequestConfig<PostShopPurchaseParams>

export const postShopPurchase = ({ config, params }: GetShopPurchaseRequestConfig) =>
	api.post<PostShopPurchaseResponse>('/shop/purchase', params, {
		...config,
		credentials: 'include',
	})
