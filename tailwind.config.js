export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        teal: {
          brand: '#0D6E6E',
          ink: '#083F3F'
        },
        gold: {
          brand: '#C9A227',
          soft: '#F3E3A1'
        },
        pearl: '#F5F5F5',
        ink: '#102525'
      },
      fontFamily: {
        sans: ['Inter', 'Vazirmatn', 'Noto Sans Arabic', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        luxury: '0 24px 80px rgba(13, 110, 110, 0.18)',
        gold: '0 20px 60px rgba(201, 162, 39, 0.24)'
      },
      backgroundImage: {
        'islamic-grid': 'radial-gradient(circle at 1px 1px, rgba(201,162,39,.22) 1px, transparent 0)'
      }
    }
  },
  plugins: []
};
