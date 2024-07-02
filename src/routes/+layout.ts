import type { MetaTagsProps } from "svelte-meta-tags";
import type { LayoutLoad } from "./$types";
import { INFO } from "$lib/assets/info.js";

export const load: LayoutLoad = ({ url }) => {
  const image = new URL("/images/ogp.png", INFO.url).href;

  const baseMetaTags = Object.freeze({
    title: INFO.about.title,
    description: INFO.about.description,
    canonical: new URL(url.pathname, url.origin).href,
    openGraph: {
      type: "website",
      url: new URL(url.pathname, url.origin).href,
      locale: "ja_JP",
      title: INFO.about.title,
      description: INFO.about.description,
      siteName: INFO.about.title,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      cardType: "summary_large_image",
      title: INFO.about.title,
      description: INFO.about.description,
      image: image,
    },
  } as const satisfies MetaTagsProps);

  return {
    baseMetaTags,
  };
};

export const prerender = true;
export const trailingSlash = "always";
