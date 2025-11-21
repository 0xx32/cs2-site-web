<script setup lang="ts">
import { APP_CONFIG } from '@/app.config'
import { STEAM_AUTH_URL } from '@/utils/constants/global'
import { APP_ROUTES_NAMES } from '@/utils/constants/routes'
import { useUser } from '@/utils/stores/useUser'

import Navigation from './navigation.vue'
import ThemeModeSwitch from './theme-mode-switch.vue'
import Button from './ui/button/Button.vue'

const { user } = useUser()
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b dark:bg-black/95 backdrop-blur dark:supports-backdrop-filter:bg-black/60"
  >
    <div class="app-container flex h-16 items-center justify-between">
      <div class="flex items-center gap-4">
        <RouterLink :to="{ name: APP_ROUTES_NAMES.MAIN }" class="text-xl font-bold">
          <span class="text-primary">{{ APP_CONFIG.appName }}</span>
        </RouterLink>
      </div>
      <Navigation />

      <div class="flex items-center gap-4">
        <ThemeModeSwitch />

        <div v-if="user">I USER</div>
        <Button v-else as-child>
          <a :href="STEAM_AUTH_URL">Войти</a>
        </Button>
      </div>
    </div>
  </header>
</template>
