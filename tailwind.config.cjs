module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': {
            transform: 'rotate(-8deg)'
          },
          '50%': {
            transform: 'rotate(8deg)'
          },
        }
      },
      animation: {
        wiggle: 'wiggle 2s ease-in-out infinite',
      }
    }
  },
  plugins: []
};