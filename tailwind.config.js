/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2563EB', // Deep blue (primary) - blue-600
        'secondary': '#059669', // Professional green (secondary) - emerald-600
        'accent': '#DC2626', // High-contrast red (accent) - red-600
        'background': '#0F172A', // Rich dark background - slate-900
        'surface': '#1E293B', // Elevated surface color - slate-800
        'text-primary': '#F8FAFC', // High-contrast white - slate-50
        'text-secondary': '#94A3B8', // Muted gray - slate-400
        'success': '#10B981', // Vibrant green - emerald-500
        'warning': '#F59E0B', // Attention-grabbing amber - amber-500
        'error': '#EF4444', // Clear red - red-500
        'border': '#334155', // Border color - slate-600
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'caption': ['Inter', 'sans-serif'],
        'data': ['JetBrains Mono', 'monospace'],
      },
      fontWeight: {
        'heading-normal': '400',
        'heading-medium': '500',
        'heading-semibold': '600',
        'body-normal': '400',
        'body-medium': '500',
        'caption-normal': '400',
        'data-normal': '400',
      },
      boxShadow: {
        'subtle': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'elevated': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'floating': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      borderRadius: {
        'interactive': '4px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      zIndex: {
        '100': '100',
        '200': '200',
        '1000': '1000',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}