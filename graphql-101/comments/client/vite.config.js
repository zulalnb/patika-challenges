import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  preview: {
    port: 8000,
  },
  resolve: {
    alias: {
      pages: resolve(__dirname, "./src/pages"),
      components: resolve(__dirname, "./src/components"),
    },
  },
});
