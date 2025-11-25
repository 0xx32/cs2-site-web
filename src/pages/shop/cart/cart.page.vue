<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'

import Layout from '@/components/layouts/default.vue'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useGetCartItems } from '@/utils/api/hooks'
import { APP_ROUTES_NAMES } from '@/utils/constants/routes'

import CartEmpty from './-components/cart-empty.vue'
import CartItem from './-components/cart-item.vue'
import CartPanel from './-components/cart-panel.vue'

const cartItemsQuery = useGetCartItems()

const cartTotalItems = cartItemsQuery.data.value?.data.result.total ?? 0

const currentTotalPrice = computed(
  () =>
    cartItemsQuery.data.value?.data.result.items.reduce(
      (acc, item) => acc + item.productVariantPrice,
      0
    ) ?? 0
)
const isCartEmpty = computed(
  () => cartItemsQuery.data.value?.data && cartItemsQuery.data.value.data.result.total === 0
)
</script>

<template>
  <Layout>
    <div v-if="cartItemsQuery.isLoading.value">loading</div>
    <template v-else>
      <CartEmpty v-if="isCartEmpty && cartItemsQuery.data.value?.data" />
      <template v-else>
        <div class="flex items-center gap-3 mb-6">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger as-child>
                <Button as-child variant="outline">
                  <RouterLink :to="{ name: APP_ROUTES_NAMES.SHOP }">
                    <Icon icon="ep:back" />
                  </RouterLink>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <span>Вернуться в магазин</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <h2 class="text-2xl">Корзина</h2>
        </div>

        <div class="grid grid-cols-[2fr_0.8fr] gap-10">
          <div>
            <div
              class="grid grid-cols-4 items-center px-4 mb-2 dark:text-gray-400 font-medium text-sm"
            >
              <span>Сервер</span>
              <span>Товар</span>
              <span>Цена</span>
            </div>

            <div class="space-y-3">
              <CartItem
                v-for="item in cartItemsQuery.data.value?.data.result.items"
                :key="item.itemId"
                v-bind="item"
              />
            </div>
          </div>

          <CartPanel :items-count="cartTotalItems" :total-price="currentTotalPrice" />
        </div>
      </template>
    </template>
  </Layout>
</template>
