<script setup lang="ts">
import ServerCard from './server-card.vue'

interface Server {
	id: number
	ip: string
	name: string
	map: string
	mode: string
}

const serversData = [
	{
		id: 1,
		ip: 'x3.qwertyx.host:26162',
		name: 'Moscow #1 | Classic',
		map: 'de_dust2',
		mode: 'Competitive',
	},
	{
		id: 2,
		ip: 'x3.qwertyx.host:26162',
		name: 'Dust2 Only | 128 Tick',
		map: 'de_dust2',
		mode: 'Casual',
	},
	{
		id: 3,
		ip: 'x3.qwertyx.host:26162',
		name: 'Mirage Masters',
		map: 'de_mirage',
		mode: 'Competitive',
	},
]

//TODO: Заменить запрос когда будет готово API
const { data: servers } = useFetch<Server[]>('/api/servers', {
	server: false,
	default: () => serversData,
})
</script>

<template>
	<div class="grid grid-cols-3 gap-8">
		<template :key="server.id" v-for="server in servers">
			<ServerCard
				:id="server.id"
				:ip="server.ip"
				:name="server.name"
				:map="server.map"
				:mode="server.mode"
				class="hover:-translate-y-1 shadow-md transition-all duration-300 hover:z-10 hover:shadow-2xl"
			/>
		</template>
	</div>
</template>
