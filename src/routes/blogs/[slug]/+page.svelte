<script lang="ts">
  import type { PageData } from "./$types";
  import Marker from "$lib/components/Marker.svelte";
  import { rewriteHTML } from "$lib/utils/middlewares/rewrite-html";

  export let data: PageData;
</script>

<h1>
  <Marker>blog</Marker>
</h1>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
<article>{@html rewriteHTML(data.detail.content)}</article>

<style lang="scss">
</style>
