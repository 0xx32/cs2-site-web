<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { TableRow } from '@nuxt/ui'

import { steamIdTo64, type SteamId } from '~/utils/helpers/steam-utils'
import { API_URL } from '~/utils/constants/api'

interface GetPlayersResponse {
	total: number
	page: number
	totalPage: number
	players: Player[]
}

export interface Player {
	name: string
	steamId: string
	gamePoints: number
	kills: number
	deaths: number
	headshots: number
	playtime: number
	lastconnect: number
	banned: 0 | 1
}

const PAGE_SIZE = 10

useTemplateRef('table')

const currentPage = ref(1)
const selectedSorting = ref('points')

const { data, status } = useFetch<GetPlayersResponse>(`${API_URL}/players`, {
	query: {
		serverId: 1,
		limit: PAGE_SIZE,
		offset: computed(() => (currentPage.value - 1) * PAGE_SIZE),
		sortBy: selectedSorting,
		sortOrder: 'desc',
	},
	server: false,
})

const pagination = ref({
	pageIndex: currentPage,
	pageSize: PAGE_SIZE,
	manualPagination: true,
	pageCount: data.value?.totalPage,
	rowCount: data.value?.total,
})

const rowSelection = ref<Record<string, boolean>>({})

const onRowClick = (_e: Event, row: TableRow<Player>) => {
	const steamId: SteamId = row.getValue('steamId')

	navigateTo(`/profile/${steamIdTo64(steamId)}`)
}

const updatePage = (page: number) => (currentPage.value = page)

const sortFiltersList = [
	{
		key: 'points',
		label: 'По очкам',
	},

	{
		key: 'kills',
		label: 'По убийствам',
	},

	{
		key: 'deaths',
		label: 'По смертям',
	},
	{
		key: 'times',
		label: 'По наигранному времени',
	},
]

const columns: ColumnDef<Player>[] = [
	{
		accessorKey: 'number',
		header: '#',
		cell: ({ row }) => {
			const number = row.index + 1 + PAGE_SIZE * (currentPage.value - 1)

			return h(
				'span',
				{
					class: {
						'text-yellow-300': number === 1,
						'text-neutral-100': number === 2,
						'text-stone-500': number === 3,
					},
				},
				number
			)
		},
	},
	{
		accessorKey: 'steamId',
		header: '',
		cell: () => '',
	},
	{
		accessorKey: 'name',
		header: 'Игрок',
		cell: ({ row }) => {
			const player = row.original
			const isBanned = !!player.banned

			return h(
				'span',
				{
					class: [isBanned && 'text-red-500 line-through'],
				},
				player.name
			)
		},
	},
	{
		accessorKey: 'gamePoints',
		header: 'Звание',
		cell: () => 'Герой',
	},
	{
		accessorKey: 'gamePoints',
		header: 'Опыт',
		cell: ({ row }) => row.getValue<number>('gamePoints').toLocaleString('ru-RU'),
	},
	{
		accessorKey: 'kills',
		header: 'Убийства',
		cell: ({ row }) => row.getValue<number>('kills').toLocaleString('ru-RU'),
	},
	{
		accessorKey: 'deaths',
		header: 'Смерти',
		cell: ({ row }) => row.getValue<number>('deaths').toLocaleString('ru-RU'),
	},
	{
		accessorKey: 'kd',
		header: 'kd',
		cell: ({ row }) => {
			const deaths: number = row.getValue('deaths')
			const kills: number = row.getValue('kills')

			const kd = deaths === 0 ? kills : kills / deaths

			return Math.round(kd * 100) / 100
		},
	},
	{
		accessorKey: 'headshots',
		header: 'В голову',
		cell: ({ row }) => row.getValue<number>('headshots').toLocaleString('ru-RU'),
	},
	{
		accessorKey: 'playtime',
		header: 'Игровое время',
		cell: ({ row }) => {
			const playtime: number = row.getValue('playtime')

			return `${Math.round(playtime / 60 / 60)}ч.`
		},
	},
	{
		accessorKey: 'lastconnect',
		header: 'Последняя игра',
		cell: ({ row }) => {
			const timestamp: number = row.getValue('lastconnect')
			const date = new Date(timestamp * 1000)

			return date
				.toLocaleString('ru-RU', {
					day: '2-digit',
					month: '2-digit',
					year: 'numeric',
					hour: '2-digit',
					minute: '2-digit',
				})
				.replace(',', ' в')
		},
	},
]
</script>

<template>
	<div class="mt-10 flex gap-5">
		<div class="mb-6 w-[260px] h-max">
			<div class="border border-muted rounded-lg p-4">
				<span class="block mb-2 font-semibold">Сортировка</span>
				<URadioGroup
					:items="sortFiltersList"
					v-model="selectedSorting"
					indicator="end"
					variant="card"
					value-key="key"
				/>
			</div>
		</div>

		<div class="grow">
			<UTable
				@select="onRowClick"
				:class="'border border-muted rounded-lg'"
				:data="data?.players ?? []"
				:columns="columns"
				:selectable="true"
				:ui="{ td: 'cursor-pointer' }"
				:loading="status === 'pending'"
				v-model:pagination="pagination"
				v-model:row-selection="rowSelection"
				ref="table"
				class="flex-1"
			/>

			<div class="flex justify-center border-t border-default pt-4">
				<UPagination
					v-model="currentPage"
					:items-per-page="PAGE_SIZE"
					:total="data?.total ?? 10"
					@update:page="updatePage"
				/>
			</div>
		</div>
	</div>
</template>
