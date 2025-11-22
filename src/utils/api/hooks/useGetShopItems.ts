import { useQuery } from '@/composobles/useQuery'

import type { GetShopItemsRequestConfig } from '../requests'
import type { QuerySettings } from '../utils.type'

import { getShopItems } from '../requests'

export const useGetShopItems = (
	settings?: QuerySettings<typeof getShopItems>,
	config?: GetShopItemsRequestConfig
) =>
	useQuery({
		queryKey: 'shopItems',
		queryFunction: () => getShopItems(config),
		...settings?.options,
	})
