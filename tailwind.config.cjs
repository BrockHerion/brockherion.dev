/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./public/**/*.html', './src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        'source-code-pro': ['"Source Code Pro"',],
				'inconsolata': ['"Inconsolata"', "monospace"],
        'open-sans': ['"Open Sans"', 'sans-serif'],
      }
    },
  },
	plugins: [
		require('@tailwindcss/line-clamp')
	],
}
