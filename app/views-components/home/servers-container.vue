<script setup lang="ts">
import ServerCard from './server-card.vue'

export interface Server {
	id: number
	ip: string
	name: string
	map_name: string
	active_players: number
	max_players: number
	status: 1 | 0
}

const config = useRuntimeConfig()

const {
	data: servers,
	refresh,
	pending,
} = await useFetch<Server[]>(`${config.public.apiUrl}/servers`)

const reload = async () => {
	await refresh()
}
</script>

<template>
	<div class="flex gap-6 items-center mb-6">
		<UButton
			color="info"
			variant="subtle"
			icon="i-bxs-analyse"
			class="cursor-pointer"
			@click="reload"
		/>
		<h2 class="font-semibold text-2xl">Наши сервера</h2>
	</div>
	<div class="grid grid-cols-3 gap-8">
		<div v-if="!servers?.length">Нет активных серверов</div>

		<template v-if="!!servers?.length">
			<ServerCard
				v-for="server in servers"
				:key="server.id"
				v-bind:server="server"
				class="hover:-translate-y-1 shadow-md transition-all duration-300 hover:z-10 hover:shadow-2xl"
			/>
		</template>

		<template v-if="pending && servers?.length === 0">
			<USkeleton class="w-[380px] h-[242px]" />
			<USkeleton class="w-[380px] h-[242px]" />
			<USkeleton class="w-[380px] h-[242px]" />
		</template>
	</div>
</template>
