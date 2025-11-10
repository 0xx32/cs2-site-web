export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },

	modules: ['@nuxt/ui'],
	css: ['~/assets/css/main.css'],

	imports: {
		autoImport: true,
	},

	runtimeConfig: {
		// Публичные (видны на клиенте)
		public: {
			apiUrl: process.env.NUXT_PUBLIC_API_URL,
		},
	},
})
