<script lang="ts">
  import BlogLink from "./BlogLink.svelte";
  import TagAndSort from "./TagAndSort.svelte";

  import { tags } from "$lib/utils/types/blogs";
  import type { EndPoints } from "$lib/utils/types/microcms";

  export let more: boolean = false;
  export let blogs: EndPoints["gets"]["blogs"];
  export let limit: number | undefined;

  const blogDataList = blogs.contents;

  let sortAsAsc = false;
  let selectedTags = Object.values(tags).map((v) => v.title);

  // eslint-disable-next-line @typescript-eslint/naming-convention
  let _blogDataList = [...blogDataList];

  $: _blogDataList = blogDataList
    .sort((a, b) => {
      const asc = a.publishedAt > b.publishedAt;
      const desc = a.publishedAt < b.publishedAt;

      return (sortAsAsc ? asc : desc) ? 1 : -1;
    })
    .filter(({ tags: _tags }) =>
      _tags.some((tag) => selectedTags.includes(tag)),
    )
    .slice(0, limit ?? blogDataList.length);
</script>

{#if more}
  <TagAndSort bind:sortAsAsc bind:selectedTags />
{/if}

<div class="content">
  {#if _blogDataList.length === 0}
    <p>ページは存在しません</p>
  {:else}
    {#each _blogDataList as blogData}
      <BlogLink {blogData} />
    {/each}
  {/if}
</div>

<style lang="scss">
  .content {
    width: 100%;
    padding: 0 $spacing-8;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: $spacing-8;
  }
</style>
