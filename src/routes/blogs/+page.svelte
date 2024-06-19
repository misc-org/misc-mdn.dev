<script lang="ts">
  import type { PageData } from "./$types";
  import BlogList from "$lib/components/BlogList.svelte";
  import Marker from "$lib/components/Marker.svelte";

  export let data: PageData;
</script>

<h1>
  <Marker>blogs</Marker>
</h1>

<section>
  <BlogList blogs={data.blogList} more />
</section>

<style lang="scss">
  section {
    width: 100%;
  }
</style>
