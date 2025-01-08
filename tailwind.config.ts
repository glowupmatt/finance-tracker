import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        beigeDark: "#98908B",
        beigeLight: "#F8F4F0",
        greyDark: "#201F24",
        greySemiDark: "##696868",
        greyLight: "##B3B3B3",
        greyLighter: "##F2F2F2",
        purple: "#AF81BA",
        turquoise: "#597C7C",
        brown: "#93674F",
        magenta: "#934F6F",
        blue: "#3F82B2",
        navyGreen: "#97A0AC",
        armyGreen: "#7F9161",
        gold: "#CAB361",
        orange: "#BE6C49",
        secondaryGreen: "#277C78",
        secondaryYellow: "##F2CDAC",
        secondaryCyan: "#82C9D7",
        secondaryNavy: "#626070",
        secondaryRed: "#C94736",
        secondaryPurple: "#826CB0",
      },
      fontFamily: {
        custom: ['"Public Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
