import type { UUID } from 'node:crypto'

export interface User {
	id: UUID
	steamId: bigint
	role: UserRoles
	balance: number
	created_at: Date
}

export type UserRoles = 'USER' | 'ADMIN' | 'MODERATOR' | 'ROOT'
