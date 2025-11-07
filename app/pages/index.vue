<script setup lang="ts">
import { ServersContainer } from '@/views-components/home'
</script>

<template>
	<div class="mt-12">
		<section>
			<ClientOnly fallback-tag="div">
				<ServersContainer />

				<template #fallback>
					<div class="flex gap-6 items-center mb-6">
						<USkeleton class="w-8 h-8" />
						<USkeleton class="w-[180px] h-8" />
					</div>
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
