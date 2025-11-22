<script setup lang="ts">
import type { TabsIndicatorProps } from 'reka-ui'
import type { HTMLAttributes, Ref } from 'vue'

import { reactiveOmit } from '@vueuse/core'
import { TabsIndicator } from 'reka-ui'
import { inject, onMounted } from 'vue'

import { cn } from '@/lib/utils'

const props = defineProps<TabsIndicatorProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')

// Уведомляем TabsList о наличии индикатора
const hasIndicator = inject<Ref<boolean>>('hasIndicator')
onMounted(() => {
  if (hasIndicator) {
    hasIndicator.value = true
  }
})
</script>

<template>
  <TabsIndicator
    data-slot="tabs-indicator"
    v-bind="delegatedProps"
    :class="
      cn(
        'absolute left-0 h-[85%] w-(--reka-tabs-indicator-size) translate-x-(--reka-tabs-indicator-position) rounded-md bg-background dark:bg-foreground shadow-sm transition-all duration-300',
        props.class
      )
    "
  />
</template>
