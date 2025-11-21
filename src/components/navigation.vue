<script setup lang="ts">
import { RouterLink } from 'vue-router'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { APP_ROUTES_NAMES } from '@/utils/constants/routes'
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuLink as-child :class="navigationMenuTriggerStyle()">
          <RouterLink :to="{ name: APP_ROUTES_NAMES.MAIN }" active-class="text-red-500 text-lg">
            Главная
          </RouterLink>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Магазин</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="grid w-[300px] gap-4">
            <li>
              <NavigationMenuLink as-child>
                <RouterLink :to="{ name: APP_ROUTES_NAMES.SHOP, params: { tab: 'privileges' } }">
                  <div class="font-medium">Привилегии</div>
                  <div class="text-muted-foreground">Бхоп, шприцы, и тд.</div>
                </RouterLink>
              </NavigationMenuLink>
              <NavigationMenuLink as-child>
                <RouterLink :to="{ name: APP_ROUTES_NAMES.SHOP, params: { tab: 'models' } }">
                  <div class="font-medium">Модели</div>
                  <div class="text-muted-foreground">Аниме модели на персонажа</div>
                </RouterLink>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
