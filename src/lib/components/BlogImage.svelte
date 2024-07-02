<script lang="ts">
  import type { EndPoints } from "$lib/utils/types/microcms";

  export let imageData: EndPoints["get"]["blogs"]["ogpImg"] | undefined =
    undefined;
  export let alt = "";
</script>

{#if imageData != null}
  <img
    src={imageData.url}
    {alt}
    height={imageData.height}
    width={imageData.width}
  />
{:else}
  <img src="/images/ogp.png" alt="Default MISC OGP" />
{/if}

<style lang="scss">
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 5px;
  }
</style>
