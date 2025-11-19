<script setup lang="ts">
import { RouterLink } from 'vue-router'

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
</script>

<template>
	<NavigationMenu>
		<NavigationMenuList>
			<NavigationMenuItem>
				<NavigationMenuLink as-child :class="navigationMenuTriggerStyle()">
					<RouterLink to="/" active-class="text-red-500 text-lg"> Главная </RouterLink>
				</NavigationMenuLink>
			</NavigationMenuItem>
		</NavigationMenuList>
	</NavigationMenu>
</template>
