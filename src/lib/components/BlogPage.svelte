<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Button from "./Tag.svelte";
  import BlogLink from "$lib/components/BlogLink.svelte";
  import type { Tags } from "$lib/utils/types/microcms";

  export let more: boolean = false;
  export let blogs;
  export let limit: number = 10;

  let blogListContents = blogs.blogList.contents;

  let state: boolean[] = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];

  let sortKey: boolean = false;
  let filterTag = "All";

  let page = 1;

  $: start = (page - 1) * limit;
  $: end = start + limit;

  const dispatch = createEventDispatcher();

  function handlePublishedAtClick() {
    sortKey = !sortKey;
    dispatch("click");
  }

  $: sortedAndFilteredBlogs = blogListContents
    .filter(
      (blog: { tags: string | string[] }) =>
        filterTag === "All" || blog.tags.includes(filterTag),
    )
    .sort((a: { publishedAt: string }, b: { publishedAt: string }) => {
      switch (sortKey) {
        case true:
          return a.publishedAt.localeCompare(b.publishedAt);
        case false:
          return b.publishedAt.localeCompare(a.publishedAt);
        default:
          return 0;
      }
    })
    .slice(start, end);

  $: morePage = blogListContents.length > end;

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
    <div>
      <select  bind:value={filterTag}>
        <option value="All">All</option>
        {#each tags as tag, i}
          <option value={tag}>{tag}</option>
        {/each}
      </select>
    </div>
    <div>
      <Button type="updown" on:click={handlePublishedAtClick}>投稿日</Button>
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
<div id="next">
  {#if page > 1}
    <button on:click={() => (page -= 1)}>前のページ</button>
  {:else}
    <span></span>
  {/if}

  {#if morePage}
    <button on:click={() => (page += 1)}>次のページ</button>
  {/if}
</div>

<style lang="scss">
  #sort {
    margin: 0 $spacing-8;
    margin-top: $spacing-20;
    margin-bottom: $spacing-8;
    display: grid;
    grid-template-columns: 150px 150px 1fr;
    gap: $spacing-8;

    div:nth-of-type(1) {
      display: grid;
      grid-template-columns: auto;
      grid-auto-flow: column;
      gap: $spacing-1;

      select {
        padding: $spacing-2 $spacing-5;
        border: 1px solid $color-text;
        border-radius: 5px;
        background-color: $color-bg;
        color: $color-text;
        cursor: pointer;
      }
    }
  }

  .content {
    width: 100%;
    margin-bottom: $spacing-20;
    padding: 0 $spacing-8;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: $spacing-8;
  }

  #next {
    margin: 0 auto;
    display: grid;
    grid-template-columns: 150px 150px;
    gap: $spacing-8;
    justify-content: center;
    margin-bottom: $spacing-20;

    button {
      padding: $spacing-5;
      border: 1px solid $color-bg;
      border-radius: 5px;
      background-color: $color-bg;
      color: $color-text;
      cursor: pointer;
      transition: all 0.3s ease-in-out;

      &:hover {
        background-color: $color-text;
        color: $color-bg;
      }
    }
  }
</style>
