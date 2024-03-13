import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  preview: {
    port: 3001,
    strictPort: true,
   },
   server: {
    hmr: {
      port: 3010,
    },
    port: 3001,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:3001",
   },

})
