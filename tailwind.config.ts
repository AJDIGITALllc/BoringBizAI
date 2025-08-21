import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        // BoringBiz.AI Brand Colors
        brand: {
          primary: "#FFB74D",      // Warm gold - optimism + wealth
          secondary: "#A1887F",    // Earthy brown - trust + stability  
          accent: "#64B5F6",       // Soft cloud blue - modern + tech
          success: "#66BB6A",      // Success green - boring = opportunity
          dark: "#212121",         // Deep gray for text and icons
          light: "#F5F5F5",        // Backgrounds / cards / modals
        },
        // Keep existing shadcn/ui color system
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        highlight: "var(--highlight)",
        ink: "var(--ink)",
        paper: "var(--paper)",
      },
      fontFamily: {
        // BoringBiz.AI Brand Fonts
        'heading': ['Poppins', 'system-ui', 'sans-serif'], // Bold, playful for titles
        'body': ['Inter', 'system-ui', 'sans-serif'],       // Clean, readable for body text
        'ui': ['Nunito Sans', 'system-ui', 'sans-serif'],   // Alternative for UI elements
        'accent': ['Fredoka', 'cursive'],                   // Fun font for microcopy/easter eggs
        'sans': ['Inter', 'system-ui', 'sans-serif'],       // Default fallback
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
