import { ref } from 'vue'

export interface UseMutationOptions<Variables = any, Data = any> {
	mutationFn: (variables: Variables) => Promise<Data>
	onSuccess?: (data: Data, variables: Variables) => void
	onError?: (error: Error, variables: Variables) => void
	onSettled?: (data: Data | null, error: Error | null, variables: Variables) => void
}

export const useMutation = <Variables = any, Data = any>(
	options: UseMutationOptions<Variables, Data>
) => {
	const { mutationFn, onSuccess, onError, onSettled } = options

	const data = ref<Data | null>(null)
	const error = ref<Error | null>(null)
	const isLoading = ref(false)

	const mutateAsync = async (variables: Variables): Promise<Data> => {
		isLoading.value = true
		error.value = null

		try {
			const result = await mutationFn(variables)
			data.value = result

			onSuccess?.(result, variables)
			onSettled?.(result, null, variables)

			return result
		} catch (err: any) {
			const normalized = err instanceof Error ? err : new Error(String(err))
			error.value = normalized

			onError?.(normalized, variables)
			onSettled?.(null, normalized, variables)

			throw normalized
		} finally {
			isLoading.value = false
		}
	}

	const mutate = (variables: Variables) => {
		mutateAsync(variables).catch(() => {})
	}

	return {
		data,
		error,
		isLoading,
		mutate,
		mutateAsync,
	}
}
