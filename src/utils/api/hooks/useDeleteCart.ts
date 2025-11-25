import { useMutation } from '@tanstack/vue-query'

import type { DeleteCartRequestConfig } from '../requests'

import { deleteCart } from '../requests'

export const useDeleteCartMutation = (
	settings?: MutationSettings<DeleteCartRequestConfig, typeof deleteCart>
) =>
	useMutation({
		mutationKey: ['deleteCart'],
		mutationFn: ({ config }) => deleteCart({ config }),
		...settings?.options,
	})
