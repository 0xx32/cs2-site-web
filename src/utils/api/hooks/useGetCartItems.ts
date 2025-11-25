import { useQuery } from '@tanstack/vue-query'

import type { GetCartItemsRequestConfig } from '../requests'

import { getCartItems } from '../requests'

export const useGetCartItems = (
	settings?: QuerySettings<typeof getCartItems>,
	config?: GetCartItemsRequestConfig
) =>
	useQuery({
		queryKey: ['cartItems'],
		queryFn: () => getCartItems(config),
		...settings?.options,
	})
