import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    base: "/employee-shift-scheduler/",
    build: {
        sourcemap: false,
    },
    plugins: [react()],
});
