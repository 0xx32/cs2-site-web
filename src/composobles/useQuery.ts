import type { Ref } from 'vue'

import { ref, watch } from 'vue'

interface UseQueryOptions<Data = unknown> {
	queryFunction: () => Promise<Data>
	immediate?: boolean
	refetch?: Ref<boolean>
	onSuccess?: (data: Data) => void
	onError?: (error: Error) => void
}

export function useQuery<Data = unknown>(options: UseQueryOptions<Data>) {
	const data = ref<Data | null>(null)
	const error = ref<Error | null>(null)
	const loading = ref(false)

	const execute = async () => {
		loading.value = true
		error.value = null

		try {
			const response = await options.queryFunction()

			data.value = response as Data

			if (options.onSuccess) {
				options.onSuccess(response)
			}
		} catch (e) {
			error.value = e instanceof Error ? e : new Error(String(e))

			if (options.onError) {
				options.onError(error.value)
			}
		} finally {
			loading.value = false
		}
	}

	if (options.immediate !== false) {
		execute()
	}

	if (options.refetch) {
		watch(options.refetch, (shouldRefetch) => {
			if (shouldRefetch) {
				execute()
			}
		})
	}

	return {
		data,
		error,
		loading,
		execute,
		refetch: execute,
	}
}
