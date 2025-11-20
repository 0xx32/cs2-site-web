<script setup lang="ts">
import { APP_CONFIG } from '@/app.config'
</script>

<template>
  <footer class="border-t border-zinc-800 py-6">
    <div class="app-container">
      <div class="grid md:grid-cols-3 gap-8">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="font-semibold">{{ APP_CONFIG.appName }}</span>
          </div>
          <p class="text-sm text-zinc-400">
            Профессиональная платформа для серверов Counter-Strike 2
          </p>
        </div>

        <div>
          <h4 class="font-semibold mb-4 text-sm">Поддержка</h4>
          <ul class="space-y-2 text-sm text-zinc-400">
            <li>
              <a
                href="#"
                class="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                >FAQ</a
              >
            </li>
            <li>
              <a
                href="#"
                class="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                >Правила</a
              >
            </li>
            <li>
              <a
                href="#"
                class="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                >Контакты</a
              >
            </li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold mb-4 text-sm">Социальные сети</h4>
          <ul class="space-y-2 text-sm text-zinc-400">
            <li>
              <a
                href="#"
                class="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                >Discord</a
              >
            </li>
            <li>
              <a
                href="#"
                class="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                >VK</a
              >
            </li>
            <li>
              <a
                href="#"
                class="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                >Telegram</a
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-6 pt-4 border-t border-zinc-800 text-center text-sm text-zinc-500">
        © 2025 CS2 Platform. Все права защищены.
      </div>
    </div>
  </footer>
</template>
