<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import Layout from '@/components/layouts/default.vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useQuery } from '@/composobles/useQuery'
import { api } from '@/utils/api/instance'

import ProductCard from './-components/product-card.vue'

const route = useRoute()

const tab = computed(() => {
  const t = route.params.tab as string | undefined
  return t === 'models' ? 'models' : 'privileges'
})

const shopItemsQuery = useQuery({
  queryFunction: () => api.get<GetShopItemsResponse>('/shop/items'),
  immediate: true,
})
</script>

<template>
  <Layout>
    <Tabs :default-value="tab" class="mt-6">
      <div class="flex justify-center">
        <TabsList class="flex justify-center">
          <TabsTrigger value="privileges"> Привилегии </TabsTrigger>
          <TabsTrigger value="models"> Модели </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="privileges">
        <div v-if="shopItemsQuery.data" class="grid grid-cols-3 justify-items-center">
          <ProductCard
            v-for="product in shopItemsQuery.data.value?.data.products"
            :key="product.id"
            :product="product"
          />
        </div>
      </TabsContent>
    </Tabs>
  </Layout>
</template>
