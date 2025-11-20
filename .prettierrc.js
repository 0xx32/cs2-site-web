import prettierConfig from '@0x32/prettier'

const config = {
	...prettierConfig,

	overrides: [
		{
			files: '*.vue',
			options: {
				tabWidth: 2,
				useTabs: false,
			},
		},
	],
}

export default config
