<script setup lang="ts">
import Footer from './components/layout/Footer.vue'
import Header from './components/layout/Header.vue'
import Provider from './provider.vue'
</script>

<template>
	<Provider>
		<Header />
		<UMain>
			<NuxtLayout>
				<NuxtPage />
			</NuxtLayout>
		</UMain>
		<Footer />
	</Provider>
</template>
