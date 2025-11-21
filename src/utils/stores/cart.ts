import type { DeepReadonly } from 'vue'

import { reactive, readonly } from 'vue'
import z from 'zod'

interface CartItem {
	product: {
		id: number
		name: string
		discount: number
	}
	server: {
		id: number
		name: string
	}
	variant: {
		id: number
		title: string
		price: number
	}
}

type ProductId = CartItem['product']['id']

export interface Cart {
	items: CartItem[]
}

interface ActionOptions {
	persistSave?: boolean
}

const cartSchema = z.object({
	items: z.array(
		z.object({
			product: z.object({
				id: z.number(),
				name: z.string(),
				discount: z.number(),
			}),
			server: z.object({
				id: z.number(),
				name: z.string(),
			}),
			variant: z.object({
				id: z.number(),
				title: z.string(),
				price: z.number(),
			}),
		})
	),
})

const CART_STORAGE_KEY = 'cart' as const

const loadCart = (): Cart => {
	try {
		const cartStorage = localStorage.getItem(CART_STORAGE_KEY)
		if (!cartStorage) return { items: [] }

		const data = JSON.parse(cartStorage) as Cart

		const result = cartSchema.safeParse(data)

		if (!result.success) {
			console.warn('Invalid cart data:', z.treeifyError(result.error))
			return { items: [] }
		}

		return result.data
	} catch (error) {
		console.warn('Failed to load cart from localStorage:', error)
		return { items: [] }
	}
}

const state = reactive<Cart>(loadCart())
const cart = readonly(state) as DeepReadonly<Cart>

const persist = () => {
	try {
		localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ items: state.items }))
	} catch (error) {
		console.error('Failed to persist cart:', error)
	}
}

const cartActions = {
	isExistItem: (item: CartItem) => {
		let isExist = false

		state.items.forEach((cartItem) => {
			if (
				item.product.id === cartItem.product.id &&
				item.server.id === cartItem.server.id &&
				item.variant.id === cartItem.variant.id
			) {
				isExist = true
			}
		})

		return isExist
	},

	addItem: (item: CartItem, options: ActionOptions = {}) => {
		if (cartActions.isExistItem(item)) return false

		state.items.push(item)

		if (options.persistSave !== false) persist()

		return true
	},

	removeItem: (productId: ProductId, options: ActionOptions = {}) => {
		const index = state.items.findIndex((item) => item.product.id === productId)
		if (index === -1) return

		state.items.splice(index, 1)

		if (options.persistSave !== false) persist()
	},

	toggleItem: (item: CartItem, options: ActionOptions = {}) => {
		if (cartActions.isExistItem(item)) {
			cartActions.removeItem(item.product.id, { persistSave: false })
		} else {
			cartActions.addItem(item, { persistSave: false })
		}

		if (options.persistSave !== false) persist()
	},

	clearCart: (options: ActionOptions = {}) => {
		state.items = []

		if (options.persistSave !== false) persist()
	},

	getItemsCount: () => state.items.length,

	getTotalPrice: () => state.items.reduce((acc, item) => acc + item.variant.price, 0),
} as const

export const useCartStore = () => ({
	state: {
		items: cart.items,
	},
	actions: cartActions,
})
