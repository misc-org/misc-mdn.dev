<script lang="ts">
  import BlogLink from "$lib/components/BlogLink.svelte";
  import Button from "./Button.svelte";
  import type { Tags } from "$lib/utils/types/microcms";

  export let more: boolean = false;
  export let blogs;
  export let limit: number = 10;

  let blogListContents = blogs.blogList.contents;

  let sortKey = "publishedAt";
  let filterTag = "";

  let page = 1;

  $: start = (page - 1) * limit;
  $: end = start + limit;

  $: sortedAndFilteredBlogs = blogListContents
    .filter((blog: { tags: string | string[]; }) => filterTag === "All" || blog.tags.includes(filterTag))
    .sort((a: { publishedAt: string; }, b: { publishedAt: string; }) => {
      switch (sortKey) {
        case "publishedAtAsc":
          return a.publishedAt.localeCompare(b.publishedAt);
        case "publishedAtDesc":
          return b.publishedAt.localeCompare(a.publishedAt);
        default:
          return 0;
      }
    })
    .slice(start, end);

  $: more = blogListContents.length > end;

  const tags: Tags[] = [
    "お知らせ",
    "ブログ",
    "作品紹介",
    "活動報告",
    "1 年生",
    "2 年生",
    "3 年生",
    "_migrated",
  ];
</script>

{#if more}
  <div id="sort">
    <label>
      Sort by:
      <select bind:value={sortKey}>
        <option value="publishedAtAsc">Date (ascending)</option>
        <option value="publishedAtDesc">Date (descending)</option>
      </select>
    </label>
    <div>
      Filter by tag:
      <Button on:click={() => (filterTag = "All")}>All</Button>
      {#each tags as tag (tag)}
        <Button on:click={() => (filterTag = tag)}>{tag}</Button>
      {/each}
    </div>
  </div>
{/if}

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
  <button on:click={() => (page -= 1)}>前のページ</button>
{/if}

{#if more}
  <button on:click={() => (page += 1)}>次のページ</button>
{/if}

<style lang="scss">
  #sort {
    margin-top: $spacing-20;
    margin-bottom: $spacing-8;
  }
  .content {
    width: 100%;
    margin-bottom: $spacing-20;
    padding: 0 $spacing-8;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: $spacing-8;
  }
</style>
