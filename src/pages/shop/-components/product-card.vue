<script setup lang="ts">
import { computed, ref } from 'vue'
import { toast } from 'vue-sonner'

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
import { subtractPercentRounded } from '@/utils/helpers/number'
import { useCartStore } from '@/utils/stores/cart'

interface ProductCardProps {
  product: Product
}

interface Server {
  id: number
  name: string
}

const { product } = defineProps<ProductCardProps>()

const selectedVariant = ref<ProductVariant>(product.variants[0]!)
const currentPrice = computed(() => selectedVariant.value.price)

const cartStore = useCartStore()

const servers = [
  {
    id: 1,
    name: 'Сервер 1',
  },
  {
    id: 2,
    name: 'Сервер 2',
  },
]

const selectedServer = ref<Server>()

const addCartHandler = () => {
  if (!selectedServer.value) {
    toast.warning('Сервер не выбран')
    return
  }
  if (!selectedVariant.value) {
    toast('Период не выбран')
    return
  }

  const result = cartStore.actions.addItem({
    product: {
      id: product.id,
      name: product.name,
      discount: product.discountPercent,
    },
    server: {
      id: selectedServer.value.id,
      name: selectedServer.value.name,
    },
    variant: {
      id: selectedVariant.value.id,
      title: selectedVariant.value.label,
      price: subtractPercentRounded(selectedVariant.value.price, product.discountPercent, 0),
    },
  })

  if (result) {
    toast.success('Товар добавлен в корзину')
  } else {
    toast.warning('Товар уже есть в корзине')
  }
}
</script>

<template>
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
      <div class="space-y-4 mt-4 mb-4">
        <Select v-model="selectedServer">
          <SelectTrigger class="w-full">
            <SelectValue placeholder="Выберите сервер" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Серверы</SelectLabel>
              <SelectItem v-for="server in servers" :key="server.id" :value="server">
                {{ server.name }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

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
        <PopoverContent class="w-76 mt-2 p-2">
          <div
            v-for="(feature, index) in product.advantages"
            :key="index"
            class="flex items-center gap-3 p-3 py-2 p rounded-lg hover:bg-accent/50 transition-colors"
          >
            <div
              class="h-4 w-4 rounded-full bg-green-700 flex items-center justify-center shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
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
          <div v-else class="text-xs text-muted-foreground">за {{ selectedVariant.days }} дней</div>
        </div>
      </div>

      <!-- Кнопки -->
      <div class="flex gap-3">
        <Button variant="outline" @click="addCartHandler"> В корзину </Button>

        <Button class="flex-1 gap-2"> Купить сейчас </Button>
      </div>
    </CardContent>
  </Card>
</template>
