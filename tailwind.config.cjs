/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./public/**/*.html', './src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}'],
	darkMode: ["class"],
  theme: {
    extend: {
			typography: {
        DEFAULT: {
          css: {
            'blockquote p:first-of-type::before': false,
            'blockquote p:first-of-type::after': false,
          },
        },
      },
      fontFamily: {
				'proxima-nova': ['proxima-nova', 'sans-serif'],
				'ibm-plex-mono': ['IBM Plex Mono', 'monospace']
      },
			colors: {
				'grey-2': '#E1E1E1',
				'grey-8': '#515151',
				'grey-9': '#3B3B3B',
				'grey-10': '#222222'
			}
    },
  },
	plugins: [require("@tailwindcss/typography")]
}
