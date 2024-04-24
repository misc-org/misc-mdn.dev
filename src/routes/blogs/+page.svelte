<script lang="ts">
  import type { PageData } from "./$types";
  import Marker from "$lib/components/Marker.svelte";

  export let data: PageData;
  let blogListContents = data.blogList.contents;

  function formatDate(dateString: string | number | Date) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }
</script>

<h1>
  <Marker>blogs</Marker>
</h1>

<div class="content">
  {#each blogListContents as blog}
    <div>
      <a href={`/blogs/${blog.id}`}><h3>{blog.title}</h3></a>
      <p>公開：{formatDate(blog.publishedAt)}</p>
      <ul>
        {#each blog.tags as tag (tag)}
          <li>{tag}</li>
        {/each}
      </ul>
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
