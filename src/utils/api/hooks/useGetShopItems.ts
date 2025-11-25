import { useQuery } from '@tanstack/vue-query'

import type { GetShopProductsRequestConfig } from '../requests'

import { getShopProducts } from '../requests'

export const useGetShopItems = (
	settings?: QuerySettings<typeof getShopProducts>,
	config?: GetShopProductsRequestConfig
) =>
	useQuery({
		queryKey: ['shopItems'],
		queryFn: () => getShopProducts(config),
		...settings?.options,
	})
