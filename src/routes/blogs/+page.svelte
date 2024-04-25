<script lang="ts">
  import type { PageData } from "./$types";
  import Marker from "$lib/components/Marker.svelte";
  import BlogPage from "$lib/components/BlogPage.svelte";

  export let data: PageData;
</script>

<h1>
  <Marker>blogs</Marker>
</h1>

<section>
  <BlogPage more={true} blogs={data} limit={10} />
</section>

<style lang="scss">
  section {
    width: 100%;
  }
</style>
