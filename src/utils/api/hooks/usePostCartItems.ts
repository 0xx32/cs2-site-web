import { useMutation } from '@tanstack/vue-query'

import type { PostCartItemsRequestConfig } from '../requests'

import { postCartItems } from '../requests'

export const usePostCartItems = (
	settings?: MutationSettings<PostCartItemsRequestConfig, typeof postCartItems>
) =>
	useMutation({
		mutationKey: ['deleteCartItem'],
		mutationFn: ({ params, config }) =>
			postCartItems({ params, config: { ...settings?.config, ...config } }),
		...settings?.options,
	})
