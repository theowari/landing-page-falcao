import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(root, "src") },
  },
  build: {
    rollupOptions: {
      // As páginas continuam sendo HTML estático; o React entra só como ilha.
      input: {
        main: path.resolve(root, "index.html"),
        v1: path.resolve(root, "prototipos/v1/index.html"),
        v2: path.resolve(root, "prototipos/v2/index.html"),
        v3: path.resolve(root, "prototipos/v3/index.html"),
      },
    },
  },
});
