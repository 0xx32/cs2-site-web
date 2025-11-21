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
          <ul class="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
            <li class="row-span-3">
              <NavigationMenuLink as-child>
                <RouterLink
                  class="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                  :to="{ name: APP_ROUTES_NAMES.CART }"
                >
                  <div class="mt-4 mb-2 text-lg font-medium">Корзина</div>
                  <p class="text-muted-foreground text-sm leading-tight">
                    Ваши будущие покупки здесь!
                  </p>
                </RouterLink>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink as-child>
                <RouterLink :to="{ name: APP_ROUTES_NAMES.SHOP, params: { tab: 'privileges' } }">
                  <div class="font-medium">Привилегии</div>
                  <div class="text-muted-foreground">Бхоп, шприцы, и тд.</div>
                </RouterLink>
              </NavigationMenuLink>
            </li>
            <li>
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
