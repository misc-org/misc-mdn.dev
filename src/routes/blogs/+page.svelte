<script lang="ts">
  import type { PageData } from "./$types";
  import Marker from "$lib/components/Marker.svelte";
  import BlogPage from "$lib/components/BlogPage.svelte";

  export let data: PageData;

  import { onMount } from "svelte";

  let limit: number;

  onMount(() => {
    const width = window.innerWidth;
    if (width <= 480) {
      limit = 4; // モバイルデバイスの場合
    } else if (width <= 768) {
      limit = 8; // タブレットの場合
    } else {
      limit = 12; // デスクトップの場合
    }
  });
</script>

<h1>
  <Marker>blogs</Marker>
</h1>

<section>
  <BlogPage more={true} blogs={data} {limit} />
</section>

<style lang="scss">
  section {
    width: 100%;
  }
</style>
