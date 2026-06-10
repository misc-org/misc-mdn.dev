<script lang="ts">
  import type { EndPoints } from "$lib/utils/types/microcms";

  let {
    imageData = undefined,
    alt = "",
  }: {
    imageData?: EndPoints["get"]["blogs"]["ogpImg"] | undefined;
    alt?: string;
  } = $props();
</script>

{#if imageData != null}
  <img
    src={imageData.url}
    {alt}
    height={imageData.height}
    width={imageData.width}
  />
{:else}
  <img src="/images/ogp.png" alt="Default MISC OGP" width="1200" height="630" />
{/if}

<style lang="scss">
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 5px;
  }
</style>
