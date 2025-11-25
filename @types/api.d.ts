type BaseResponse<Result = undefined> = Result extends undefined
	? {
			success: boolean
			message: string
		}
	: {
			success: boolean
			message: string
			result: Result
		}

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
	description: string
	type: string
	advantages: string[]
	discount_percent: number
	enabled: number
	variants: ProductVariant[]
}

interface ProductVariant {
	id: number
	product_id: number
	price: number
	duration_label: string
	duration_days: number
}

interface PurchaseItem {
	productId: number
	productVariantId: number
	serverId: number
}

interface PostShopPurchaseResponse {
	result: {
		success: boolean
		item: PurchaseItem
		purchaseId?: number
		error?: string
	}[]
}

interface GetCartItemsResponse {
	items: {
		itemId: number
		serverId: number
		serverName: string
		productId: number
		productName: string
		productVariantId: number
		productVariantLabel: string
		productVariantPrice: number
	}[]
	total: number
}
