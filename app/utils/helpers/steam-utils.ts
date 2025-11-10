const STEAM_BASE = BigInt('76561197960265728')

export type SteamId = `STEAM_${number}:${0 | 1}:${number}`
export type SteamId64 = string
export type SteamId3 = `[U:1:${number}]`

export function steamIdTo64(steamId: SteamId): SteamId64 {
	const parts = steamId.split(':') as [string, number, number]
	if (parts.length !== 3) throw new Error('Неверный формат SteamID')

	const y = BigInt(parts[1])
	const z = BigInt(parts[2])

	const steam64 = STEAM_BASE + z * 2n + y
	return steam64.toString()
}

export function steam64ToId(steam64: SteamId64): SteamId {
	const id64 = BigInt(steam64)
	const diff = id64 - STEAM_BASE
	const y = diff % 2n
	const z = diff / 2n
	return `STEAM_1:${y}:${z}` as SteamId
}

export function steam64ToId3(steam64: SteamId64): SteamId3 {
	const id64 = BigInt(steam64)
	const diff = id64 - STEAM_BASE
	const accountId = diff
	return `[U:1:${accountId}]` as SteamId3
}

export function steamId3To64(steamId3: SteamId3): SteamId64 {
	const match = steamId3.match(/\[U:1:(\d+)\]/)
	if (!match || !match[1]) throw new Error('Неверный формат SteamID3')
	const accountId = BigInt(match[1])
	const steam64 = STEAM_BASE + accountId
	return steam64.toString()
}

export function steamIdTo3(steamId: SteamId): SteamId3 {
	const steam64 = steamIdTo64(steamId)
	return steam64ToId3(steam64)
}

export function steamId3ToId(steamId3: SteamId3): SteamId {
	const steam64 = steamId3To64(steamId3)
	return steam64ToId(steam64)
}
