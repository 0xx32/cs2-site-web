export const useCopy = () => {
	const copied = ref(false)

	const copy = async (text: string): Promise<boolean> => {
		try {
			await navigator.clipboard.writeText(text)
			copied.value = true

			return true
		} catch (err) {
			console.error('Failed to copy:', err)
			copied.value = false

			return false
		}
	}

	return { copy, copied }
}
