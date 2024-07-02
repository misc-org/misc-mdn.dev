import type { MetaTagsProps } from "svelte-meta-tags";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const pageMetaTags = Object.freeze({
    title: "About",
  } as const satisfies MetaTagsProps);

  return {
    pageMetaTags,
  };
};
