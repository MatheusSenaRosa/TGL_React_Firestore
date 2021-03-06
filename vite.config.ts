import * as path from "path";
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@privateRoutes": path.resolve(__dirname, "src/pages/private"),
      "@publicRoutes": path.resolve(__dirname, "src/pages/public"),
      "@components": path.resolve(__dirname, "src/components"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@store": path.resolve(__dirname, "src/shared/store"),
      "@utils": path.resolve(__dirname, "src/shared/utils"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@services": path.resolve(__dirname, "src/shared/services"),
      "@themes": path.resolve(__dirname, "src/styles/themes"),
      "@interfaces": path.resolve(__dirname, "src/shared/utils/interfaces"),
      "@animations": path.resolve(__dirname, "src/styles/animations"),
      "@context": path.resolve(__dirname, "src/shared/context"),
    },
  },
});
