<script lang="ts">
  import { onMount } from "svelte";
  import BlogPage from "$lib/components/BlogPage.svelte";
  import Marker from "$lib/components/Marker.svelte";
  import type { EndPoints } from "$lib/utils/types/microcms";

  export let data: EndPoints["gets"]["blogs"];

  let limit: number;

  console.log(data);

  onMount(() => {
    const width = window.innerWidth;
    if (width <= 480) {
      limit = 4;
    } else if (width <= 768) {
      limit = 8;
    } else {
      limit = 12;
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
