<script lang="ts">
  import type { PageData } from "./$types";
  import BlogDetails from "$lib/components/BlogDetails.svelte";
  import HeadTags from "$lib/components/HeadTags.svelte";

  export let data: PageData;
</script>

<HeadTags
  title={data.detail.title}
  description={data.detail.description}
  ogpImg={data.detail.ogpImg.url}
/>

<BlogDetails details={data.detail} />
