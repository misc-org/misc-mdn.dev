import type { MetaTagsProps } from "svelte-meta-tags";
import type { PageServerLoad } from "./$types";
import { getContentList } from "$lib/utils/services/microcms";

export const load: PageServerLoad = async () => {
  const res = await getContentList("blogs");

  const pageMetaTags = Object.freeze({
    title: "Blogs",
  } as const satisfies MetaTagsProps);

  return {
    blogList: res,
    pageMetaTags,
  };
};
