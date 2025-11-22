import type { UseQueryOptions } from '@/composobles/useQuery'

export interface QuerySettings<Func extends (...args: any) => Promise<any>> {
	config?: ApiRequestOptions
	options?: UseQueryOptions<Awaited<ReturnType<Func>>>
}
