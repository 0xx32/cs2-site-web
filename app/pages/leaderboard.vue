<script setup lang="ts">
import { LeaderboardList } from '@/views-components/leaderboard'
</script>

<template>
	<div class="mt-10">
		<ClientOnly fallback-tag="div">
			<LeaderboardList />

			<template #fallback><div class="text-center" v-text="'Загрузка таблицы...'"></div></template>
		</ClientOnly>
	</div>
</template>
