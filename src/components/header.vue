<script setup lang="ts">
import { Icon } from '@iconify/vue'

import { APP_CONFIG } from '@/app.config'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { STEAM_AUTH_URL } from '@/utils/constants/global'
import { APP_ROUTES_NAMES } from '@/utils/constants/routes'
import { useUserStore } from '@/utils/stores/user'

import Navigation from './navigation.vue'
import ThemeModeSwitch from './theme-mode-switch.vue'
import Button from './ui/button/Button.vue'
import { Item } from './ui/item'

const userStore = useUserStore()
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

        <div v-if="userStore.state.user" class="flex gap-3 items-center">
          <Item variant="muted" class="py-1 px-3">
            <div class="flex items-center gap-1 text-gray-400 font-medium text-lg">
              <span>{{ userStore.state.user.balance }}</span>
              <Icon icon="healthicons:money-bag" class="w-6 h-6" />
            </div>
          </Item>

          <Avatar class="w-10 h-10">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <Button v-else as-child>
          <a :href="STEAM_AUTH_URL">Войти</a>
        </Button>
      </div>
    </div>
  </header>
</template>
