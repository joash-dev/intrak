/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', // gray-200
        input: 'var(--color-input)', // white
        ring: 'var(--color-ring)', // blue-800
        background: 'var(--color-background)', // gray-50
        foreground: 'var(--color-foreground)', // gray-800
        primary: {
          DEFAULT: 'var(--color-primary)', // blue-800
          foreground: 'var(--color-primary-foreground)', // white
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // amber-500
          foreground: 'var(--color-secondary-foreground)', // gray-800
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // red-500
          foreground: 'var(--color-destructive-foreground)', // white
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // slate-100
          foreground: 'var(--color-muted-foreground)', // gray-500
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // sky-500
          foreground: 'var(--color-accent-foreground)', // white
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // white
          foreground: 'var(--color-popover-foreground)', // gray-800
        },
        card: {
          DEFAULT: 'var(--color-card)', // white
          foreground: 'var(--color-card-foreground)', // gray-800
        },
        success: {
          DEFAULT: 'var(--color-success)', // emerald-500
          foreground: 'var(--color-success-foreground)', // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // amber-500
          foreground: 'var(--color-warning-foreground)', // gray-800
        },
        error: {
          DEFAULT: 'var(--color-error)', // red-500
          foreground: 'var(--color-error-foreground)', // white
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      borderRadius: {
        lg: '8px',
        md: '6px',
        sm: '4px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0, 0, 0, 0.1)',
        modal: '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      transitionDuration: {
        smooth: '150ms',
        state: '300ms',
      },
      transitionTimingFunction: {
        'ease-out': 'ease-out',
        'ease-in-out': 'ease-in-out',
        spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      zIndex: {
        '1000': '1000',
        '1100': '1100',
        '1200': '1200',
        '1300': '1300',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}