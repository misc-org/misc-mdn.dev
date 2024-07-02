<script lang="ts">
  import { MetaTags } from "svelte-meta-tags";
  import { INFO } from "$lib/assets/info";

  export let title: string | undefined = undefined;
  export let description: string | undefined = undefined;
  export let ogpImgUrl: string | undefined = undefined;

  let titleText =
    title != null ? `${title} | ${INFO.about.name.en}` : INFO.about.title;
</script>

<MetaTags
  title={titleText}
  description={description ?? INFO.about.description}
  openGraph={{
    title: titleText,
    description: description ?? INFO.about.description,
    url: INFO.url,
    type: "website",
    locale: "ja_JP",
    images: [
      {
        url: ogpImgUrl ?? `${INFO.url}/images/ogp.png`,
        width: 1200,
        height: 630,
        alt: titleText,
      },
    ],
  }}
  canonical={INFO.url}
/>
