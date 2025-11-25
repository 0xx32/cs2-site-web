import { useMutation } from '@tanstack/vue-query'

import type { DeleteCartItemsRequestConfig } from '../requests'

import { deleteCartItems } from '../requests'

export const useDeleteCartItemsMutation = (
	settings?: MutationSettings<DeleteCartItemsRequestConfig, typeof deleteCartItems>
) =>
	useMutation({
		mutationKey: ['deleteCartItem'],
		mutationFn: ({ params, config }) => deleteCartItems({ params, config }),
		...settings?.options,
	})
