import type { Ref } from 'vue'

import { onUnmounted, ref, watch } from 'vue'

interface CacheEntry<Data = unknown> {
	data: Data
	timestamp: number
	promise?: Promise<Data>
}

const cache = new Map<string, CacheEntry>()

const DEFAULT_STALE_TIME = 1000 * 60
const DEFAULT_CACHE_TIME = 5 * 60 * 1000

export interface UseQueryOptions<Data = any> {
	queryKey: string | any[]
	queryFunction: () => Promise<Data>
	immediate?: boolean
	enabled?: Ref<boolean> | boolean
	staleTime?: number
	cacheTime?: number
	keepPreviousData?: boolean
	onSuccess?: (data: Data) => void
	onError?: (error: Error) => void
}

export const useQuery = <Data = unknown>(options: UseQueryOptions<Data>) => {
	const {
		queryKey,
		queryFunction,
		immediate = true,
		enabled = ref(true),
		staleTime = DEFAULT_STALE_TIME,
		cacheTime = DEFAULT_CACHE_TIME,
		keepPreviousData = false,
		onSuccess,
		onError,
	} = options

	const cacheKey = JSON.stringify(queryKey)
	const enabledRef = typeof enabled === 'boolean' ? ref(enabled) : enabled

	const data = ref<Data | null>(null)
	const error = ref<Error | null>(null)
	const isLoading = ref(false)

	const scheduleCacheCleanup = () => {
		setTimeout(() => {
			const entry = cache.get(cacheKey)
			if (entry && Date.now() - entry.timestamp > cacheTime) {
				cache.delete(cacheKey)
			}
		}, cacheTime)
	}

	const execute = async () => {
		if (!enabledRef.value) return

		const cached = cache.get(cacheKey)
		const now = Date.now()

		// Используем свежий кэш
		if (cached?.data && now - cached.timestamp < staleTime) {
			data.value = cached.data
			return cached.data
		}

		// Ждём уже запущенный запрос (deduplication)
		if (cached?.promise) {
			try {
				const result = await cached.promise
				data.value = result
				return result
			} catch (e) {
				error.value = e instanceof Error ? e : new Error(String(e))
				throw e
			}
		}

		if (!data.value || !keepPreviousData) {
			isLoading.value = true
		}

		if (!keepPreviousData) {
			error.value = null
		}

		const promise = queryFunction()

		// Сохраняем промис для deduplication
		cache.set(cacheKey, {
			data: cached?.data ?? null,
			timestamp: now,
			promise,
		})

		try {
			const response = await promise
			data.value = response
			error.value = null

			// Обновляем кэш
			cache.set(cacheKey, {
				data: response,
				timestamp: Date.now(),
			})

			onSuccess?.(response)
			scheduleCacheCleanup()
			return response
		} catch (e) {
			const err = e instanceof Error ? e : new Error(String(e))
			error.value = err
			onError?.(err)

			// Удаляем промис из кэша при ошибке
			const entry = cache.get(cacheKey)
			if (entry) {
				delete entry.promise
			}

			throw err
		} finally {
			isLoading.value = false
		}
	}

	// Первичная загрузка
	if (immediate && enabledRef.value) {
		execute()
	}

	// Отслеживание enabled
	watch(enabledRef, (val, oldVal) => {
		if (val && !oldVal && !data.value) {
			execute()
		}
	})

	// Очистка при размонтировании
	onUnmounted(() => {
		scheduleCacheCleanup()
	})

	return {
		data,
		error,
		isLoading,
		refetch: execute,
		invalidate: () => {
			cache.delete(cacheKey)
		},
	}
}

// Глобальные утилиты
export const invalidateQueries = (pattern?: string) => {
	if (!pattern) {
		cache.clear()
		return
	}

	cache.forEach((_, key) => {
		if (key.includes(pattern)) {
			cache.delete(key)
		}
	})
}

export const getQueryData = <Data = unknown>(queryKey: string | any[]) => {
	const cacheKey = JSON.stringify(queryKey)
	return cache.get(cacheKey)?.data as Data | undefined
}
