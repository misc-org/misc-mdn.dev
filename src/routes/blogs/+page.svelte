<script lang="ts">
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import BlogPage from "$lib/components/BlogPage.svelte";
  import Marker from "$lib/components/Marker.svelte";

  export let data: PageData;

  let limit: number;

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
  <Marker label='blogs' />
</h1>

<section>
  <BlogPage more={true} blogs={data} {limit} />
</section>

<style lang="scss">
  section {
    width: 100%;
  }
</style>
