import type {Config} from "tailwindcss"

const config: Pick<Config, "darkMode" | "content" | "presets"> = {
  darkMode: ["class"],
  content: [
    "./entrypoints/**/*.{html,ts,tsx}",
    "./components/**/*.{html,ts,tsx}"
  ]
}

export default config
