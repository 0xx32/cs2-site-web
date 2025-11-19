<script setup lang="ts">
import { APP_CONFIG } from '@/app.config'

import Navigation from './navigation.vue'
import ThemeModeSwitch from './theme-mode-switch.vue'
import Button from './ui/button/Button.vue'
</script>

<template>
	<header class="sticky top-0 z-50 border-b border-zinc-800">
		<div class="container mx-auto flex items-center justify-between py-4">
			<div class="flex items-center gap-4">
				<a href="/" class="text-xl font-bold">
					<span class="text-primary">{{ APP_CONFIG.appName }}</span>
				</a>
			</div>
			<Navigation />

			<div class="flex items-center gap-4">
				<ThemeModeSwitch />

				<Button>Войти</Button>
			</div>
		</div>
	</header>
</template>
