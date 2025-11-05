<script setup lang="ts">
import { ServersContainer } from '@/views-components/home'
</script>

<template>
	<div class="mt-12">
		<section>
			<h2 class="mb-6 font-semibold text-2xl">Наши сервера</h2>
			<ClientOnly fallback-tag="div">
				<ServersContainer />

				<template #fallback>
					<div class="grid grid-cols-3 gap-8">
						<USkeleton class="w-[380px] h-[242px]" />
						<USkeleton class="w-[380px] h-[242px]" />
						<USkeleton class="w-[380px] h-[242px]" />
					</div>
				</template>
			</ClientOnly>
		</section>
	</div>
</template>
