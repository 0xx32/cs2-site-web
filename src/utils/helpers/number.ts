export const subtractPercentRounded = (number: number, percent: number, decimals = 2) => {
	const result = number * (1 - percent / 100)
	return Number(result.toFixed(decimals))
}
