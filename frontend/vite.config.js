import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

import tailwindcssForms from "@tailwindcss/forms";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      plugins: [tailwindcssForms],
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8888",
        changeOrigin: true,
      },
    },
    // proxy: {
    //   "/api/": "http://localhost:5000",
    //   "/uploads": "http://:5000",
    // },
  },
});
