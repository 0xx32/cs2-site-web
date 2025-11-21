<script setup lang="ts">
import Footer from '@/components/footer.vue'
import Header from '@/components/header.vue'
</script>

<template>
  <div class="flex flex-col justify-between h-screen">
    <Header />

    <main class="flex-1">
      <div class="app-container py-5">
        <slot />
      </div>
    </main>

    <Footer />
  </div>
</template>
