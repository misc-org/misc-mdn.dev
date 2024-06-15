import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [vitePreprocess()],

  kit: {
    adapter: adapter({
      pages: "dist",
      assets: "dist",
      fallback: undefined,
      precompress: false,
      strict: true,
    }),
    prerender: {
      handleHttpError: ({ path, message }) => {
        if (path.startsWith("/drafts")) {
          return;
        }
        throw new Error(message);
      },
    },
  },
  onwarn: (warning, handler) => {
    const { code } = warning;

    if (code === "css-unused-selector") {
      return;
    }

    handler(warning);
  },
};

export default config;
