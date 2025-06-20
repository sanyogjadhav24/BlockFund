import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    allowedHosts: ["c023-203-192-207-231.ngrok-free.app"]
   },
   
  
});
