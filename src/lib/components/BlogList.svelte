<script lang="ts">
  import BlogLink from "./BlogLink.svelte";
  import TagAndSort from "./TagAndSort.svelte";

  import { tags } from "$lib/utils/types/blogs";
  import type { EndPoints } from "$lib/utils/types/microcms";

  let {
    more = false,
    blogs,
    limit = undefined,
  }: {
    more?: boolean;
    blogs: EndPoints["gets"]["blogs"];
    limit?: number | undefined;
  } = $props();

  const blogDataList = $derived(blogs.contents);

  let sortAsAsc = $state(false);
  let selectedTags = $state(Object.values(tags).map((v) => v.title));

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const _blogDataList = $derived(
    [...blogDataList]
      .sort((a, b) => {
        const asc = a.publishedAt > b.publishedAt;
        const desc = a.publishedAt < b.publishedAt;

        return (sortAsAsc ? asc : desc) ? 1 : -1;
      })
      .filter(({ tags: _tags }) =>
        _tags.some((tag) => selectedTags.includes(tag)),
      )
      .slice(0, limit ?? blogDataList.length),
  );
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
    gap: $spacing-10;
  }
</style>
