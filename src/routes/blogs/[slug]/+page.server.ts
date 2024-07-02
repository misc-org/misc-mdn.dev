import type { MetaTagsProps } from "svelte-meta-tags";
import type { PageServerLoad } from "./$types";
import { INFO } from "$lib/assets/info";
import { getContentDetail } from "$lib/utils/services/microcms";

export const load: PageServerLoad = async ({ params }) => {
  const { slug } = params;
  const res = await getContentDetail("blogs", slug);

  const title = `${res.title} | Blogs | ${INFO.about.title}`;
  const description = res.description ?? INFO.about.description;
  const image = res.ogpImg?.url ?? new URL("/images/ogp.png", INFO.url).href;
  const pageMetaTags = Object.freeze({
    title,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      cardType: "summary_large_image",
      title,
      description,
      image,
    },
  } as const satisfies MetaTagsProps);

  return {
    detail: res,
    pageMetaTags,
  };
};
