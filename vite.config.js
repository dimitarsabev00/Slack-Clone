import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {
      REACT_SPINKIT_NO_STYLES: process.env.REACT_SPINKIT_NO_STYLES || false,
    },
  },
});
