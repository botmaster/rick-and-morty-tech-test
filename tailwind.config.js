module.exports = {
  content: ['./public/index.html', './src/**/*.{html,js,vue}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Rubik', 'sans-serif'],
        body: ['Rubik', 'sans-serif'],
        wubba: ['wubba_regular', 'sans-serif'],
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#FFFFFF',
        black: '#000000',
        body: {
          background: '#f2f4f8',
          backgrounddark: '#2E3440',
        },
        brown: {
          DEFAULT: '#44281d',
        },
        salmon: {
          DEFAULT: '#e4a788',
        },
        yellow: {
          DEFAULT: '#f0e14a',
        },
        green: {
          100: '#f5faed',
          200: '##eaf5db',
          DEFAULT: '#97ce4c',
          700: '#79a53d',
          900: '#0f1508',
        },
        pink: {
          DEFAULT: '#e89ac7',
          700: '#ae7495',
        },
        turquoise: {
          DEFAULT: '#00b0c8',
          800: '#004650',
          900: '#002328',
        },
        polarnight: {
          'nord-0': '#2E3440',
          'nord-1': '#3B4252',
          'nord-2': '#434C5E',
          'nord-3': '#4C566A',
        },
        snowstorm: {
          'nord-4': '#D8DEE9',
          'nord-5': '#E5E9F0',
          'nord-6': '#ECEFF4',
        },
        frost: {
          'nord-7': '#8FBCBB',
          'nord-8': '#88C0D0',
          'nord-9': '#81A1C1',
          'nord-10': '#5E81AC',
        },
        aurora: {
          'nord-11': '#BF616A',
          'nord-12': '#D08770',
          'nord-13': '#EBCB8B',
          'nord-14': '#A3BE8C',
          'nord-15': '#B48EAD',
        },
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
  plugins: [],
}
