<script setup lang="ts">
import type { TabsTriggerProps } from 'reka-ui'
import type { HTMLAttributes, Ref } from 'vue'

import { reactiveOmit } from '@vueuse/core'
import { TabsTrigger, useForwardProps } from 'reka-ui'
import { computed, inject, ref } from 'vue'

import { cn } from '@/lib/utils'

const props = defineProps<TabsTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)

// Получаем информацию о наличии индикатора
const hasIndicator = inject<Ref<boolean>>('hasIndicator', ref(false))

// Условные стили для active состояния
const activeStyles = computed(() => {
  if (hasIndicator.value) {
    // Если есть индикатор — убираем фон и тень у active таба
    return 'dark:data-[state=active]:text-background'
  } else {
    // Если нет индикатора — показываем дефолтные стили
    return 'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm dark:data-[state=active]:bg-foreground dark:data-[state=active]:border-input dark:data-[state=active]:text-background'
  }
})
</script>

<template>
  <TabsTrigger
    data-slot="tabs-trigger"
    :class="
      cn(
        // Базовые стили
        'z-10 inline-flex  flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow,background-color,border-color] cursor-pointer disabled:pointer-events-none disabled:opacity-50',

        // Цвет текста
        'text-foreground dark:text-muted-foreground',

        // Условные active стили
        activeStyles,

        // Focus стили
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring focus-visible:ring-[3px] focus-visible:outline-1',

        // Иконки
        '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4',

        props.class
      )
    "
    v-bind="forwardedProps"
  >
    <slot />
  </TabsTrigger>
</template>
