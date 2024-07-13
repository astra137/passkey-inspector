import { defineConfig, defineGlobalStyles } from '@pandacss/dev'

// biome-ignore lint/style/noDefaultExport: invariant
export default defineConfig({
	syntax: 'object-literal',
	jsxFramework: 'react',

	// Whether to use css reset
	preflight: true,

	// Where to look for your css declarations
	include: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],

	// Files to exclude
	exclude: [],

	// Useful for theme customization
	theme: {
		extend: {
			tokens: {
				spacing: {
					sm: { value: '8px' },
					md: { value: '12px' },
				},
			},
		},
	},

	// The output directory for your css system
	outdir: 'styled-system',

	globalCss: defineGlobalStyles({
		html: {
			bg: 'black',
			color: 'gray.300',
		},
	}),
})
