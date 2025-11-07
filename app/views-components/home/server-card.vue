<script setup lang="ts">
import { useCopy } from '@/composobles/useCopy'
import type { Server } from './servers-container.vue'

interface ServerCardProps {
	server: Server
}

const { server } = defineProps<ServerCardProps>()

const connectLink = `steam://run/730//+connect ${server.ip}`

const { copy } = useCopy()

const toast = useToast()

const copyIpHandler = () => {
	copy(server.ip)

	toast.add({
		title: `IP сервера скопирован`,
		icon: 'i-bxs-copy',
	})
}
</script>

<template>
	<UCard
		class="min-w-[200px] group"
		:ui="{
			body: 'sm:p-0',
		}"
	>
		<template #header>
			<div class="flex justify-between">
				<span
					class="inline-flex items-center justify-between w-max px-2 rounded-md bg-accented mr-3 font-semibold"
					>#{{ server.id }}</span
				>
				<span class="font-bold text-xl">{{ server.name }}</span>
				<UBadge class="ml-auto" color="success">В сети</UBadge>
			</div>
		</template>

		<template #default>
			<div
				class="sm:px-6 py-4 relative bg-cover h-[180px] flex flex-col"
				style="background-image: url('/images/dust2.jpg')"
			>
				<div
					class="before:absolute before:inset-0 before:bg-black/50 before:transition-opacity before:duration-300 before:content-[''] group-hover:before:opacity-0"
				></div>

				<div class="z-10 relative mt-auto">
					<div class="flex justify-between mb-4">
						<UBadge variant="outline" color="neutral">{{ server.map_name }}</UBadge>
						<UBadge variant="subtle" color="warning"
							>{{ server.active_players }}/{{ server.max_players }}</UBadge
						>
					</div>

					<div class="flex justify-between gap-4">
						<UButton as="a" :href="connectLink" class="flex justify-center w-full cursor-pointer">
							Подключиться
						</UButton>

						<UButton color="info" variant="soft" class="cursor-pointer" :onclick="copyIpHandler"
							>IP</UButton
						>
					</div>
				</div>
			</div>
		</template>
	</UCard>
</template>
