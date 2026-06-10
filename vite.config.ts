import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  // NOTE: vitest が内包する vite の型と root の vite の型が異なるためキャストする
  plugins: [sveltekit() as never],

  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
    globals: true,
  },

  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: ["."],
        additionalData: `
        @use "src/lib/styles/variables/breakpoints.scss" as *;
        @use "src/lib/styles/variables/colors.scss" as *;
        @use "src/lib/styles/variables/fonts.scss" as *;
        @use "src/lib/styles/variables/sizes.scss" as *;
        @use "src/lib/styles/variables/spacings.scss" as *;
        @use "src/lib/styles/variables/z-index.scss" as *;
        @use "src/lib/styles/responsive.scss" as *;
        `.trim(),
      },
    },
  },
});
