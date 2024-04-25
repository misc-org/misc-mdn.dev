<script lang="ts">
  import type { PageData } from "./$types";
  import BlogLink from "$lib/components/BlogLink.svelte";
  import Marker from "$lib/components/Marker.svelte";
  import type { Blog } from "$lib/types";

  export let data: PageData;
  let blogListContents = data.blogList.contents;

  let sortKey = 'publishedAt';
  let filterTag: Tag = "";

  let limit = 10;
  let page = 1;

  $: start = (page - 1) * limit;
  $: end = start + limit;

  $: sortedAndFilteredBlogs = blogListContents
    .filter(blog => filterTag === "" || blog.tags.includes(filterTag))
    .sort((a, b) => {
      switch (sortKey) {
        case 'publishedAtAsc':
          return a.publishedAt.localeCompare(b.publishedAt);
        case 'publishedAtDesc':
          return b.publishedAt.localeCompare(a.publishedAt);
        default:
          return 0;
      }
    })
    .slice(start, end); // 現在のページに表示するブログの範囲だけを取得

  $: more = blogListContents.length > end; // 次のページが存在する場合はtrue


  const tags: Tag[] = ["", "お知らせ", "ブログ", "作品紹介", "活動報告", "1 年生", "2 年生", "3 年生", "_migrated"];
</script>

<h1>
  <Marker>blogs</Marker>
</h1>

<div>
  <label>
    Sort by:
    <select bind:value={sortKey}>
      <option value="publishedAtAsc">Date (ascending)</option>
      <option value="publishedAtDesc">Date (descending)</option>
    </select>
  </label>
  <div>
    Filter by tag:
    {#each tags as tag (tag)}
      <button on:click={() => filterTag = tag}>{tag || 'All'}</button>
    {/each}
  </div>
</div>

<div class="content">
  {#if sortedAndFilteredBlogs.length === 0}
  <p id="no-page">ページは存在しません</p>
{:else}
{#each sortedAndFilteredBlogs as blog}
<BlogLink
  id={blog.id}
  title={blog.title}
  publishedAt={blog.publishedAt}
  tags={blog.tags}
  ogpImg={blog.ogpImg}
/>
{/each}
{/if}
</div>

{#if page > 1}
  <button on:click={() => page -= 1}>前のページ</button>
{/if}

{#if more}
  <button on:click={() => page += 1}>次のページ</button>
{/if}

<style lang="scss">
  .content {
    width: 100%;
    margin: $spacing-20 0;
    padding: 0 $spacing-8;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: $spacing-8;
  }
</style>
