<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useQueryClient } from '@tanstack/vue-query'
import { computed } from 'vue'

import { Button } from '@/components/ui/button'
import { Item, ItemContent } from '@/components/ui/item'
import { useDeleteCartItemsMutation } from '@/utils/api/hooks'

interface CartItemProps {
  serverId: number
  serverName: string
  productVariantId: number
  productVariantLabel: string
  productVariantPrice: number
  itemId: number
}

const { serverId, serverName, productVariantLabel, productVariantPrice, itemId } =
  defineProps<CartItemProps>()

const queryClient = useQueryClient()

const deleteCartItemMutation = useDeleteCartItemsMutation({
  options: {
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['cartItems'] }),
  },
})

const deleteCartItemMutationVariables = computed(
  () => deleteCartItemMutation.variables.value?.params
)

const removeCartItem = async () => {
  await deleteCartItemMutation.mutateAsync({
    params: {
      itemId,
    },
  })

  queryClient.invalidateQueries({ queryKey: ['cartItems'] })
}
</script>

<template>
  <Item variant="outline" class="py-2">
    <ItemContent>
      <div class="grid grid-cols-4 items-center dark:text-gray-300">
        <span class="text-sm font-medium"> #{{ serverId }} {{ serverName }} </span>

        <span>{{ productVariantLabel }} - {{ productVariantPrice }} ₽ </span>

        <span>
          {{ productVariantPrice }} ₽
          <!-- <span class="text-yellow-500">(-{{ 0 }}%)</span> -->
        </span>

        <span class="text-end">
          <Button
            variant="link"
            class="p-2 cursor-pointer group"
            :disabled="deleteCartItemMutationVariables?.itemId === itemId"
            @click="() => removeCartItem()"
          >
            <Icon
              icon="radix-icons:cross-2"
              class="h-5 w-5 transition-colors"
              :class="[
                deleteCartItemMutationVariables?.itemId !== itemId
                  ? 'group-hover:text-red-500'
                  : '',
              ]"
            />
          </Button>
        </span>
      </div>
    </ItemContent>
  </Item>
</template>
