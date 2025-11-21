<script setup lang="ts">
import { computed, ref } from 'vue'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

interface ProductCardProps {
  product: Product
}

const { product } = defineProps<ProductCardProps>()

const selectedVariant = ref<ProductVariant>(product.variants[0]!)
const currentPrice = computed(() => selectedVariant.value.price)
</script>

<template>
  <div class="w-full max-w-sm mx-auto p-4">
    <Card>
      <CardHeader class="relative overflow-hidden">
        <div class="relative">
          <CardTitle class="text-xl text-center">
            {{ product.name }}
          </CardTitle>
          <!-- <Badge variant="destructive" class="absolute top-0 right-0">
            Хит продаж
          </Badge> -->
        </div>
      </CardHeader>

      <CardContent class="space-y-4">
        <!-- Тарифы -->
        <div class="space-y-4 mt-4 mb-4">
          <Select v-model="selectedVariant">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Выберите период" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Периоды</SelectLabel>
                <SelectItem v-for="period in product.variants" :key="period.days" :value="period">
                  {{ period.label }} - {{ period.price }}р
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Popover>
          <PopoverTrigger as-child>
            <Button class="w-full" variant="secondary"> Что входит в VIP? </Button>
          </PopoverTrigger>
          <PopoverContent class="w-76 mt-2">
            <div
              v-for="(feature, index) in product.advantages"
              :key="index"
              class="flex items-center gap-3 p-3 p rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div
                class="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-primary"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div class="font-medium leading-none text-sm">
                {{ feature }}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Separator class="mb-2" />

        <!-- Итоговая цена -->
        <div class="flex items-center justify-between">
          <span class="text-sm text-muted-foreground">Итого к оплате:</span>
          <div class="text-right">
            <div class="text-lg font-bold">{{ currentPrice }}₽</div>
            <div v-if="selectedVariant.days === 0" class="text-xs text-muted-foreground">
              навсегда
            </div>
            <div v-else class="text-xs text-muted-foreground">
              за {{ selectedVariant.days }} дней
            </div>
          </div>
        </div>

        <!-- Кнопки -->
        <div class="flex gap-3">
          <Button variant="outline" size="default" class="gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path
                d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"
              />
            </svg>
            В корзину
          </Button>
          <Button class="flex-1 gap-2">
            Купить сейчас
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
