<script lang="ts">
  import type { PageData } from "./$types";
  import BlogLink from "$lib/components/BlogLink.svelte";
  import Marker from "$lib/components/Marker.svelte";

  type Tag = "" | "お知らせ" | "作品紹介" | "活動報告" | "1 年生" | "2 年生" | "3 年生" | "_migrated";

  export let data: PageData;
  let blogListContents = data.blogList.contents;

  let sortKey = 'publishedAt';
  let filterTag: Tag;

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
    });
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
  <label>
    Filter by tag:
    <input type="text" bind:value={filterTag} placeholder="Enter tag" />
  </label>
</div>

<div class="content">
  {#each sortedAndFilteredBlogs as blog}
    <BlogLink
      id={blog.id}
      title={blog.title}
      publishedAt={blog.publishedAt}
      tags={blog.tags}
      ogpImg={blog.ogpImg}
    />
  {/each}
</div>

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
