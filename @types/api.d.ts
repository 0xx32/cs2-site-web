interface User {
	id: string
	steamId: bigint
	role: UserRoles
	balance: number
	created_at: Date
}

type UserRoles = 'USER' | 'ADMIN' | 'MODERATOR' | 'ROOT'

interface Product {
	id: number
	name: string
	categoryId: number
	discountPercent: number
	isActive: number
	imageUrl?: string
	description?: string
	advantages: string[]
	variants: ProductVariant[]
	created_at: string
}

interface ProductVariant {
	id: number
	days: number
	label: string
	price: number
}

interface ProductCategory {
	id: number
	name: string
}

interface GetShopItemsResponse {
	products: Product[]
	categories: ProductCategory[]
}
