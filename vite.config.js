import { defineConfig } from "vite";

export default defineConfig({
    base: "./",
    build: {
        outDir: "docs"
    },
    server: {
        host: "0.0.0.0"
    }
});
