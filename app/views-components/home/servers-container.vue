<script setup lang="ts">
import ServerCard from './server-card.vue'

export interface Server {
	id: number
	ip: string
	name: string
	map_name: string
	active_players: number
	max_players: number
}

//TODO: Заменить запрос когда будет готово API
const { data: servers, refresh } = useFetch<Server[]>('http://localhost:4444/api/servers', {
	server: false,
	// default: () => serversData,
})
</script>

<template>
	<div class="flex gap-6 items-center mb-6">
		<UButton
			color="info"
			variant="subtle"
			icon="i-bxs-analyse"
			class="cursor-pointer"
			:onclick="refresh"
		/>
		<h2 class="font-semibold text-2xl">Наши сервера</h2>
	</div>
	<div class="grid grid-cols-3 gap-8">
		<template :key="server.id" v-for="server in servers">
			<ServerCard
				v-bind:server="server"
				class="hover:-translate-y-1 shadow-md transition-all duration-300 hover:z-10 hover:shadow-2xl"
			/>
		</template>
	</div>
</template>
