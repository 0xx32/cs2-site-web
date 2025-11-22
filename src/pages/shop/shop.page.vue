<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import Layout from '@/components/layouts/default.vue'
import { Button } from '@/components/ui/button'
import { Item } from '@/components/ui/item'
import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetShopItems } from '@/utils/api/hooks/useGetShopItems'
import { APP_ROUTES_NAMES } from '@/utils/constants/routes'

import ProductCard from './-components/product-card.vue'

const route = useRoute()

const tab = computed(() => {
  const t = route.params.tab as string | undefined
  return t === 'models' ? 'models' : 'privileges'
})

const shopItemsQuery = useGetShopItems()
</script>

<template>
  <Layout>
    <Tabs :default-value="tab" class="mt-6 grid grid-cols-[3fr_0.8fr] gap-6">
      <TabsContent value="privileges">
        <div
          v-if="shopItemsQuery.data"
          class="grid grid-cols-3 gap-x-3 gap-y-6 justify-items-center"
        >
          <ProductCard
            v-for="product in shopItemsQuery.data.value?.data.products"
            :key="product.id"
            :product="product"
            class="w-full"
          />
        </div>
      </TabsContent>
      <TabsContent value="models" />

      <Item variant="outline" class="block h-max sticky top-26">
        <TabsList class="flex justify-center w-full relative">
          <TabsIndicator />
          <TabsTrigger value="privileges"> Привилегии </TabsTrigger>
          <TabsTrigger value="models"> Модели </TabsTrigger>
        </TabsList>

        <Button variant="outline" as-child class="w-full mt-6">
          <RouterLink :to="{ name: APP_ROUTES_NAMES.CART }">
            <Icon icon="humbleicons:cart" class="w-10 h-10" />
            Перейти в корзину
          </RouterLink>
        </Button>
      </Item>
    </Tabs>
  </Layout>
</template>
