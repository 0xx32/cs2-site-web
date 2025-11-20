<script setup lang="ts">
import { computed, ref } from 'vue'

import Button from '@/components/ui/button/Button.vue'
import { cn } from '@/lib/utils'

import ServerCard from './server-card.vue'

interface ServersContainerProps {
  class?: string
}

const props = defineProps<ServersContainerProps>()

const servers = [
  {
    id: 1,
    ip: '127.0.0.1',
    gameMode: 'PUBLIC',
    name: 'cs2-server-1',
    map: 'de_dust2',
    activePlayers: 10,
    maxPlayers: 20,
    ping: 100,
    status: 'ONLINE',
  },
  {
    id: 2,
    ip: '127.0.0.1',
    gameMode: 'AWP',
    name: 'cs2-server-2',
    map: 'de_dust2',
    activePlayers: 0,
    maxPlayers: 20,
    ping: 76,
    status: 'OFFLINE',
  },
]

const selectedGameMode = ref('ALL')

const serversList = computed(() => {
  if (selectedGameMode.value === 'ALL') {
    return servers
  }

  return servers.filter((server) => server.gameMode === selectedGameMode.value)
})

const gameModsList = servers.map((server) => server.gameMode)
gameModsList.unshift('ALL')
</script>

<template>
  <div>
    <div class="flex gap-2 items-center mb-2">
      <Button
        v-for="mode in gameModsList"
        :key="mode"
        :variant="mode === selectedGameMode ? 'default' : 'secondary'"
        @click="selectedGameMode = mode"
      >
        {{ mode }}
      </Button>
    </div>
    <div
      :class="
        cn('max-w-2xl p-4 grid grid-cols-1 gap-2 border border-zinc-800 rounded-lg', props.class)
      "
    >
      <ServerCard v-for="server in serversList" :key="server.id" v-bind="server" />
    </div>
  </div>
</template>
