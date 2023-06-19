/** @type {import('tailwindcss').Config} */
export {

  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        // 'mainColor': '#166e48'
        'mainColor': '#2563eb',
        'bgColorLight': '#fafafa',
        'bgColorDark': '#1b1b1b',
        'bgColorDark2': 'rgb(36,36,36)',
        'bgColorDark3': 'rgb(53,55,59)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',

      },
    },
  },
  plugins: [],
}
