<script lang="ts">
  import type { PageData } from "./$types";
  import Marker from "$lib/components/Marker.svelte";

  export let data: PageData;
  let blogListContents = data.blogList.contents;
</script>

<h1>
  <Marker>blogs</Marker>
</h1>

<div class="content">
  {#each blogListContents as blog}
    <div>
      <code>{blog.id}</code>
      <a href={`/blogs/${blog.id}`}><h3>{blog.title}</h3></a>
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
