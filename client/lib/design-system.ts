// Professional SaaS Design System
// Inspired by: Stripe, Linear, Vercel, Notion, Datadog

export const designSystem = {
  // 🎨 Color Palette - Natural, not flashy
  colors: {
    // Backgrounds
    bg: {
      base: "#0a0a0a", // Main background
      elevated: "#0f0f0f", // Cards, panels
      surface: "#141414", // Hover states
      overlay: "rgba(0, 0, 0, 0.7)",
    },

    // Text colors
    text: {
      primary: "#ffffff",
      secondary: "#a3a3a3",
      tertiary: "#6b6b6b",
      accent: "#e5e5e5",
    },

    // Semantic colors - Natural hues
    semantic: {
      success: "#10b981", // Emerald
      warning: "#f59e0b", // Amber
      error: "#ef4444", // Red
      info: "#3b82f6", // Blue
      neutral: "#6b7280", // Gray
    },

    // Status colors - Muted
    status: {
      active: "#34d399",
      inactive: "#6b7280",
      pending: "#fbbf24",
      error: "#f87171",
    },

    // Brand colors - Professional variants
    brand: {
      primary: "#1e3a8a", // Deep blue
      secondary: "#7c3aed", // Subtle purple
      accent: "#06b6d4", // Cyan
    },

    // Borders
    border: {
      light: "rgba(255, 255, 255, 0.05)",
      medium: "rgba(255, 255, 255, 0.10)",
      dark: "rgba(255, 255, 255, 0.15)",
    },
  },

  // 📐 Spacing system
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    "2xl": "32px",
    "3xl": "48px",
  },

  // 🔤 Typography - Clear hierarchy
  typography: {
    // Page titles
    h1: {
      fontSize: "28px",
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
    },

    // Section titles
    h2: {
      fontSize: "20px",
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: "-0.01em",
    },

    // Card titles
    h3: {
      fontSize: "16px",
      fontWeight: 600,
      lineHeight: 1.4,
    },

    // Labels and small text
    label: {
      fontSize: "13px",
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: "0.01em",
    },

    // Body text
    body: {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: 1.6,
    },

    // Small text
    small: {
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: 1.5,
    },

    // Descriptions
    description: {
      fontSize: "13px",
      fontWeight: 400,
      lineHeight: 1.5,
      color: "#a3a3a3",
    },
  },

  // 🎭 Shadows - Realistic depth
  shadows: {
    // Subtle elevation
    sm: "0 2px 4px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.03)",

    // Standard elevation
    md: "0 4px 12px rgba(0, 0, 0, 0.20), 0 0 0 1px rgba(255, 255, 255, 0.05)",

    // Strong elevation
    lg: "0 8px 24px rgba(0, 0, 0, 0.28), 0 0 0 1px rgba(255, 255, 255, 0.08)",

    // Focus state
    focus:
      "0 0 0 3px rgba(59, 130, 246, 0.1), 0 0 0 1px rgba(59, 130, 246, 0.5)",
  },

  // 🔄 Radius values - Varied, not uniform
  radius: {
    xs: "4px",
    sm: "6px",
    md: "8px",
    lg: "12px",
    xl: "16px",
  },

  // ⏱️ Animations - Natural timing
  animation: {
    fast: "0.10s cubic-bezier(0.4, 0, 0.2, 1)",
    normal: "0.12s cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "0.14s cubic-bezier(0.4, 0, 0.2, 1)",
    slowest: "0.18s cubic-bezier(0.4, 0, 0.2, 1)",
  },

  // 🔗 Grid system
  grid: {
    gap: "16px",
    gapCompact: "12px",
    columns: {
      full: "1fr",
      half: "repeat(2, 1fr)",
      third: "repeat(3, 1fr)",
      quarter: "repeat(4, 1fr)",
    },
  },

  // 📦 Borders - Consistent, minimal
  borders: {
    default: "1px solid rgba(255, 255, 255, 0.08)",
    subtle: "1px solid rgba(255, 255, 255, 0.04)",
    strong: "1px solid rgba(255, 255, 255, 0.15)",
  },
} as const;

// 🎨 Tailwind class helpers
export const dsClasses = {
  // Cards - with proper shadow
  card: "bg-[#0f0f0f] border border-white/5 rounded-lg",
  cardHover:
    "hover:bg-white/[0.02] hover:border-white/10 transition-all duration-150",

  // Buttons - varied sizing
  buttonBase: "font-medium transition-all duration-150 focus:outline-none",
  buttonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
  buttonSecondary: "bg-white/10 hover:bg-white/15 text-white",
  buttonDanger:
    "bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30",

  // Typography
  heading1: "text-[28px] font-bold leading-tight text-white",
  heading2: "text-[20px] font-semibold leading-tight text-white",
  heading3: "text-[16px] font-semibold text-white",
  label: "text-[13px] font-medium text-white/80 uppercase tracking-wide",
  description: "text-[13px] text-white/60",

  // Badges - less perfect
  badge:
    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px] font-medium border",
  badgeSuccess: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  badgeWarning: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  badgeError: "bg-red-500/15 text-red-300 border-red-500/30",
  badgeInfo: "bg-blue-500/15 text-blue-300 border-blue-500/30",

  // Inputs
  input:
    "w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-white/30 focus:bg-white/[0.08] transition-colors duration-150",

  // Grids
  gridAuto:
    "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  gridMetrics: "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

// Noise texture SVG (1-2% opacity)
export const noisePattern = `
  data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E
    %3Cfilter id='noise'%3E
      %3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' /%3E
      %3CfeColorMatrix type='saturate' values='.3'/%3E
    %3C/filter%3E
    %3Crect width='100' height='100' fill='%23000000' filter='url(%23noise)' opacity='.02'/%3E
  %3C/svg%3E
`;
