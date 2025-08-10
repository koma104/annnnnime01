/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: '#fff',
        black: '#000',
        background: '#f5f5f5',
        'text-primary': '#333',
        'text-secondary': '#666',
        overlay: 'rgba(0, 0, 0, 0.1)',
        'overlay-light': 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        primary: [
          'Roboto',
          'Noto Sans JP',
          'Helvetica Neue',
          'Arial',
          'Hiragino Kaku Gothic ProN',
          'Hiragino Sans',
          'Meiryo',
          'sans-serif',
        ],
      },
      fontSize: {
        xs: 'clamp(0.75rem, 1vw, 1rem)', // 12px - 16px
        sm: 'clamp(0.875rem, 1.1vw, 1.125rem)', // 14px - 18px
        base: 'clamp(1rem, 1.25vw, 1.25rem)', // 16px - 20px
        lg: 'clamp(1.25rem, 1.6vw, 1.75rem)', // 20px - 28px
        xl: 'clamp(1.5rem, 2vw, 2rem)', // 24px - 32px
        '2xl': 'clamp(2.25rem, 3vw, 3rem)', // 36px - 48px
        '3xl': 'clamp(6rem, 9.375vw, 8rem)', // 96px - 128px
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        bold: '700',
      },
      lineHeight: {
        tight: '1.2',
        normal: '1.4',
        relaxed: '1.6',
      },
      spacing: {
        xs: 'clamp(0.25rem, 0.5vw, 0.5rem)', // 4px - 8px
        sm: 'clamp(0.5rem, 0.75vw, 1rem)', // 8px - 16px
        md: 'clamp(1rem, 1.25vw, 1.5rem)', // 16px - 24px
        lg: 'clamp(1.5rem, 1.75vw, 2rem)', // 24px - 32px
        xl: 'clamp(2rem, 2.5vw, 3rem)', // 32px - 48px
        '2xl': 'clamp(3rem, 3.5vw, 4rem)', // 48px - 64px
        '3xl': 'clamp(4rem, 5vw, 6rem)', // 64px - 96px
        '4xl': 'clamp(6rem, 7vw, 8rem)', // 96px - 128px
        '5xl': 'clamp(8rem, 10vw, 12rem)', // 128px - 192px
      },
      maxWidth: {
        container: '1200px',
      },
      minWidth: {
        card: '275px',
      },
      borderRadius: {
        sm: 'clamp(4px, 0.75vw, 8px)',
        md: 'clamp(6px, 1vw, 12px)',
        lg: 'clamp(12px, 1.25vw, 20px)',
        xl: 'clamp(16px, 1.75vw, 28px)',
      },
      boxShadow: {
        sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
        md: '0 4px 8px rgba(0, 0, 0, 0.1)',
        lg: '0 8px 16px rgba(0, 0, 0, 0.1)',
        xl: '0 16px 32px rgba(0, 0, 0, 0.1)',
        card: '0 4px 16px rgba(0, 0, 0, 0.15)',
      },
      transitionDuration: {
        fast: '150ms',
        normal: '300ms',
        slow: '900ms',
      },
      transitionTimingFunction: {
        bounce: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      zIndex: {
        dropdown: '1000',
        sticky: '1020',
        fixed: '1030',
        'modal-backdrop': '1040',
        modal: '1050',
        popover: '1060',
        tooltip: '1070',
      },
      height: {
        header: 'clamp(60px, 8vw, 80px)',
      },
    },
  },
  plugins: [],
}

