<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'

import Layout from '@/components/layouts/default.vue'
import { Button } from '@/components/ui/button'
import { Item, ItemContent } from '@/components/ui/item'
import Separator from '@/components/ui/separator/Separator.vue'
import { APP_ROUTES_NAMES } from '@/utils/constants/routes'
import { useCartStore } from '@/utils/stores/cart'

import CartEmpty from './-components/cart-empty.vue'

const cartStore = useCartStore()

const currentTotalPrice = computed(() => cartStore.actions.getTotalPrice())
</script>

<template>
  <Layout>
    <template v-if="cartStore.actions.getItemsCount() > 0">
      <h2 class="text-2xl mb-6">Корзина</h2>

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
            <Item
              v-for="(item, index) in cartStore.state.items"
              :key="index"
              variant="outline"
              class="py-2"
            >
              <ItemContent>
                <div class="grid grid-cols-4 items-center dark:text-gray-300">
                  <span class="text-sm font-medium">
                    #{{ item.server.id }} {{ item.server.name }}
                  </span>

                  <span>{{ item.product.name }} - {{ item.variant.title }} </span>

                  <span>
                    {{ item.variant.price }}р
                    <span class="text-yellow-500">(-{{ item.product.discount }}%)</span>
                  </span>

                  <span class="text-end">
                    <button
                      class="p-2 cursor-pointer group"
                      @click="cartStore.actions.removeItem(item.product.id)"
                    >
                      <Icon
                        icon="radix-icons:cross-2"
                        class="h-5 w-5 group-hover:text-red-500 transition-colors"
                      />
                    </button>
                  </span>
                </div>
              </ItemContent>
            </Item>
          </div>
        </div>

        <Item variant="outline" class="block mt-6 sticky top-26 h-max space-y-4">
          <h3 class="mb-4 text-xl font-semibold">Итого</h3>

          <div class="flex justify-between mb-2 text-gray-400">
            <span>Товары ({{ cartStore.actions.getItemsCount() }}) </span>
            <span>{{ currentTotalPrice }}₽ </span>
          </div>

          <div class="flex justify-between text-gray-400">
            <span>Скидка </span>
            <span class="text-yellow-600">0 ₽ </span>
          </div>

          <Separator class="mb-4" />

          <div class="flex justify-between mb-4">
            <span class="text-lg font-semibold">Всего </span>
            <span class="text-lg font-semibold">{{ currentTotalPrice }} ₽ </span>
          </div>

          <Button class="w-full flex items-center"> Оформить заказ </Button>
          <Button variant="secondary" as-child class="w-full flex items-center">
            <RouterLink :to="{ name: APP_ROUTES_NAMES.SHOP }"> Вернуться в магазин </RouterLink>
          </Button>
        </Item>
      </div>
    </template>
    <CartEmpty v-else />
  </Layout>
</template>
