import type { UseMutationOptions } from '@/composobles/useMutation'
import type { UseQueryOptions } from '@/composobles/useQuery'

export interface QuerySettings<Func extends (...args: any) => Promise<any>> {
	config?: ApiRequestOptions
	options?: UseQueryOptions<Awaited<ReturnType<Func>>>
}

export interface MutationSettings<Params, Func extends (...args: any) => Promise<any>> {
	config?: ApiRequestOptions
	options?: UseMutationOptions<Params, Awaited<ReturnType<Func>>>
}
