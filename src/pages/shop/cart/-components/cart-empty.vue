<script setup lang="ts">
import { ArrowRight, ShoppingCart } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { APP_ROUTES_NAMES } from '@/utils/constants/routes'
</script>

<template>
  <div class="flex flex-col items-center justify-center py-24 px-6 text-center">
    <div
      class="w-32 h-32 mb-6 rounded-full dark:bg-zinc-900 bg-zinc-100 flex items-center justify-center"
    >
      <ShoppingCart class="w-16 h-16 text-zinc-600" />
    </div>

    <h2 class="text-3xl font-bold mb-3">Корзина пуста</h2>

    <p class="text-gray-400 text-lg mb-8 max-w-md">
      Добавьте товары в корзину для оформления заказа
    </p>

    <Button size="lg" class="group" as-child>
      <RouterLink :to="{ name: APP_ROUTES_NAMES.SHOP }">
        Перейти в магазин
        <ArrowRight class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </RouterLink>
    </Button>
  </div>
</template>
