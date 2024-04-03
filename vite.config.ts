import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [sveltekit()],

  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "src/lib/styles/_breakpoints.scss" as *;
        @use "src/lib/styles/_colors.scss" as *;
        @use "src/lib/styles/_fonts.scss" as *;
        @use "src/lib/styles/_sizes.scss" as *;
        @use "src/lib/styles/_spacings.scss" as *;
        `.trim(),
      },
    },
  },
});
