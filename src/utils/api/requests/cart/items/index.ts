import type { FetchesRequestConfig } from '@siberiacancode/fetches'

import { api } from '@/utils/api/instance'

export type GetCartItemsRequestConfig = FetchesRequestConfig
export const getCartItems = ({ config }: GetCartItemsRequestConfig = {}) =>
	api.get<BaseResponse<GetCartItemsResponse>>('/cart/items', { ...config, credentials: 'include' })

interface PostCartItemsResultResponse {
	itemId: string
}
export interface PostCartItemsParams {
	productVariantId: number
	serverId: number
}
export type PostCartItemsRequestConfig = FetchesRequestConfig<PostCartItemsParams>
export const postCartItems = ({ config, params }: PostCartItemsRequestConfig) =>
	api.post<BaseResponse<PostCartItemsResultResponse>>('/cart/items', params, {
		...config,
		credentials: 'include',
	})

export interface DeleteCartItemParams {
	itemId: number
}
export type DeleteCartItemsRequestConfig = FetchesRequestConfig<DeleteCartItemParams>

export const deleteCartItems = ({ params, config }: DeleteCartItemsRequestConfig) =>
	api.delete<BaseResponse>(`/cart/items/${params.itemId}`, { ...config, credentials: 'include' })
