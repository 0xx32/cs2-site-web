type ApiRequestOptions = import('@siberiacancode/fetches').RequestOptions

interface MutationSettings<Params = void, Func = unknown> {
	config?: ApiRequestOptions
	options?: import('@tanstack/vue-query').UseMutationOptions<
		Awaited<ReturnType<Func>>,
		any,
		Params,
		any
	>
}

interface QuerySettings<Func = unknown> {
	config?: ApiRequestOptions
	options?: Omit<
		import('@tanstack/vue-query').UseQueryOptions<
			Awaited<ReturnType<Func>>,
			any,
			Awaited<ReturnType<Func>>,
			any
		>,
		'queryKey'
	>
}

interface InfinityQuerySettings<Func = unknown> {
	config?: ApiRequestOptions
	options?: Omit<
		import('@tanstack/vue-query').UseInfiniteQueryOptions<
			import('@tanstack/vue-query').InfiniteData<Awaited<ReturnType<Func>>>,
			any,
			import('@tanstack/vue-query').InfiniteData<Awaited<ReturnType<Func>>>,
			any
		>,
		'getNextPageParam' | 'initialPageParam' | 'queryKey'
	>
}
