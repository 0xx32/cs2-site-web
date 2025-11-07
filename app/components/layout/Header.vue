<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
	{
		label: 'Главная',
		to: '/',
		active: route.path === '/',
		icon: 'i-bxs-home-heart',
	},
	{
		label: 'Магазин',
		to: '/shop',
		active: route.path.startsWith('/shop'),
		icon: 'i-bxs-shopping-bag',
	},
	{
		label: 'Игроки',
		icon: 'i-bxs-food-menu',
		// children: [
		//     {
		//         label: "Топ",
		//         description: "Список лучших игроков",
		//         icon: "i-bxs-trophy",
		//         to: "/players/top",
		//     },
		// ],
	},
])
</script>

<template>
	<UHeader>
		<template #title>
			<span>ZZERO</span>
		</template>

		<UNavigationMenu :items="items" />

		<template #right>
			<div class="mr-2">
				<UColorModeButton variant="outline" />
			</div>
			<UButton color="neutral"> Войти </UButton>
		</template>
	</UHeader>
</template>
