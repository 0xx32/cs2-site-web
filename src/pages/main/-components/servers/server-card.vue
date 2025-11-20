<script setup lang="ts">
import { Icon } from '@iconify/vue'

import Button from '@/components/ui/button/Button.vue'
import Item from '@/components/ui/item/Item.vue'

interface ServerCardProps {
  id: number
  ip: string
  name: string
  map: string
  activePlayers: number
  maxPlayers: number
  ping: number
  status: string
}

const props = defineProps<ServerCardProps>()
</script>

<template>
  <Item variant="outline" class="block">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div
          class="w-2 h-2 rounded-full animate-pulse"
          :class="{
            'bg-green-500': props.status === 'ONLINE',
            'bg-red-500': props.status === 'OFFLINE',
          }"
        />
        <div>
          <h3 class="font-semibold text-sm">
            {{ props.name }}
          </h3>
          <p class="text-xs text-zinc-500">
            {{ props.map }}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-6 text-sm">
        <div class="flex items-center gap-2 transition-all duration-300 hover:scale-110">
          <svg class="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span class="text-zinc-400">{{ props.activePlayers }}/{{ props.maxPlayers }}</span>
        </div>
        <div class="flex items-center gap-2 transition-all duration-300 hover:scale-110">
          <svg class="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <span class="text-zinc-400">{{ props.ping }}ms</span>
        </div>
        <span
          class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium transition-all duration-300"
          :class="{
            'bg-green-500/10 text-green-400': props.status === 'ONLINE',
            'bg-red-500/10 text-red-400': props.status === 'OFFLINE',
          }"
        >
          {{ props.status === 'ONLINE' ? 'Онлайн' : 'Оффлайн' }}
        </span>
      </div>

      <div class="flex gap-4">
        <Button variant="ghost">
          <Icon icon="radix-icons:copy" />
        </Button>
        <Button>
          <Icon icon="radix-icons:play" />
        </Button>
      </div>
    </div>
  </Item>
</template>
