<script setup lang="ts">
import { APP_CONFIG } from '@/app.config'

import Navigation from './navigation.vue'
import ThemeModeSwitch from './theme-mode-switch.vue'
import Button from './ui/button/Button.vue'
</script>

<template>
	<header
		class="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/95 backdrop-blur supports-backdrop-filter:bg-black/60"
	>
		<div class="app-container flex h-16 items-center justify-between">
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
