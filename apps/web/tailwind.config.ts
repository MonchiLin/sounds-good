import type {Config} from "tailwindcss"

const config: Pick<Config, "darkMode" | "content" | "presets"> = {
  darkMode: ["class"],
  content: [
    "./app/**/*.tsx",
    "./components/**/*.tsx",
    "../../packages/ui/src/**/*.{ts,tsx}"
  ]
}

export default config
