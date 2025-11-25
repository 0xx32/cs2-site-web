<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query'

import { Button } from '@/components/ui/button'
import { Item } from '@/components/ui/item'
import { Separator } from '@/components/ui/separator'
import { useDeleteCartMutation } from '@/utils/api/hooks'

interface CartPanelProps {
  totalPrice: number
  itemsCount: number
}

const { itemsCount, totalPrice } = defineProps<CartPanelProps>()

const queryClient = useQueryClient()
const deleteCartMutation = useDeleteCartMutation()

const clearCart = async () => {
  await deleteCartMutation.mutateAsync({})
  await queryClient.invalidateQueries({ queryKey: ['cartItems'] })
}

const purchase = async () => {}
</script>

<template>
  <Item variant="outline" class="block mt-6 sticky top-26 h-max space-y-4">
    <h3 class="mb-4 text-xl font-semibold">Итого</h3>

    <div class="flex justify-between mb-2 text-gray-400">
      <span>Товары ({{ itemsCount }}) </span>
      <span>{{ totalPrice }}₽ </span>
    </div>

    <div class="flex justify-between text-gray-400">
      <span>Скидка </span>
      <span class="text-yellow-600">0 ₽ </span>
    </div>

    <Separator class="mb-4" />

    <div class="flex justify-between mb-4">
      <span class="text-lg font-semibold">Всего </span>
      <span class="text-lg font-semibold">{{ totalPrice }} ₽ </span>
    </div>

    <Button class="w-full flex items-center" @click="purchase"> Оформить заказ </Button>

    <Button
      variant="secondary"
      class="w-full flex items-center"
      :disabled="deleteCartMutation.isPending.value"
      @click="clearCart"
    >
      Очистить корзину
    </Button>
  </Item>
</template>
