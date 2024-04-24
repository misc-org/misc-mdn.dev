<script lang="ts">
  import { onMount } from "svelte";
  import Marker from "$lib/components/Marker.svelte";
  import { getContentList } from "$lib/utils/services/microcms";
  import type { EndPoints } from "$lib/utils/types/microcms";

  let blogListContents: EndPoints["gets"]["blogs"]["contents"] = [];
  onMount(async () => {
    const res = await getContentList("blogs");
    blogListContents = res.contents;
  });
</script>

<h2>
  <Marker>blogs</Marker>
</h2>

<div class="content">
  {#each blogListContents as blog}
    <div>
      <code>{blog.id}</code>
      <h3>{blog.title}</h3>
      <p>{blog.publishedAt}</p>
    </div>
  {/each}
</div>

<style lang="scss">
  .content {
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: $spacing-3;
  }
</style>
