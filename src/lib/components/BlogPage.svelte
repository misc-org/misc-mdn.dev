<script lang="ts">
  import Icon from "@iconify/svelte";
  import { ToggleGroup } from "bits-ui";
  import { createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";
  import Tag from "./Tag.svelte";
  import BlogLink from "$lib/components/BlogLink.svelte";
  import { getEntries } from "$lib/utils/consts";
  import { tags } from "$lib/utils/types/blogs";
  import type { TagMode } from "$lib/utils/types/blogs";
  import type { EndPoints } from "$lib/utils/types/microcms";

  export let more: boolean = false;
  export let blogs;
  export let limit: number;

  let blogListContents: EndPoints["get"]["blogs"][] = blogs.blogList.contents;

  let sortKey: boolean = true;

  let page = 1;

  $: start = (page - 1) * limit;
  $: end = start + limit;
  let value: TagMode[] = [];

  function deleteTag() {
    value = [];
  }

  const dispatch = createEventDispatcher();

  function handlePublishedAtClick() {
    sortKey = !sortKey;
    dispatch("click");
  }

  $: sortedAndFilteredBlogs = [...blogListContents].sort((a, b) => {
    if (sortKey) {
      return (
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    } else {
      return (
        new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      );
    }
  });

  $: {
    if (value.length === 0) {
      sortedAndFilteredBlogs = blogListContents.slice();
    } else {
      sortedAndFilteredBlogs = blogListContents.filter((blog) =>
        value.every((v) => blog.tags.includes(v)),
      );
    }
  }

  $: pagedBlogs = sortedAndFilteredBlogs.slice(start, end);

  $: morePage = sortedAndFilteredBlogs.length > end;

  let isOpen = false;

  function toggleMenu() {
    isOpen = !isOpen;
  }

  const items = getEntries(tags).map(([itemValue, { title, icon }]) => ({
    value: itemValue,
    label: title,
    icon,
  }));
</script>

{#if more}
  <div id="sort">
    <button id="taged" on:click={toggleMenu}>tag</button>
    {#if isOpen}
      <div id="select" transition:slide={{ duration: 200 }}>
        <div>
          <button on:click={deleteTag}>
            <Icon icon="mdi:tag-multiple" />
            <p>All</p>
          </button>
        </div>
        <ToggleGroup.Root
          bind:value
          type="multiple"
          class="flex h-input items-center gap-x-0.5 rounded-card-sm border border-border bg-background-alt px-[4px] py-1 shadow-mini"
        >
          {#each items as { label, icon }}
            <ToggleGroup.Item
              aria-label="toggle bold"
              value={label}
              class="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt transition-all hover:bg-muted active:scale-98 active:bg-dark-10 data-[state=on]:bg-muted data-[state=off]:text-foreground-alt data-[state=on]:text-foreground active:data-[state=on]:bg-dark-10"
              ><div>
                {#if value.includes(label)}
                  <Icon icon="mdi:check" />
                {:else}
                  <Icon icon="mdi:checkbox-blank-outline" />
                {/if}
                <Icon {icon} />
                <p>{label}</p>
              </div>
            </ToggleGroup.Item>
          {/each}
        </ToggleGroup.Root>
      </div>
    {/if}
    <Tag on:click={handlePublishedAtClick}>公開日</Tag>
  </div>
{/if}

<div class="content">
  {#if sortedAndFilteredBlogs.length === 0}
    <p id="no-page">ページは存在しません</p>
  {:else}
    {#each pagedBlogs as blogData}
      <BlogLink {blogData} />
    {/each}
  {/if}
</div>
<div id="next">
  {#if page > 1 && sortedAndFilteredBlogs.length !== 0}
    <button
      on:click={() => {
        page -= 1;
        window.scrollTo(0, 0);
      }}>前のページ</button
    >
  {:else}
    <span></span>
  {/if}

  {#if more && morePage && sortedAndFilteredBlogs.length !== 0}
    <button
      on:click={() => {
        page += 1;
        window.scrollTo(0, 0);
      }}>次のページ</button
    >
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
    position: relative;

    button {
      border: 1px solid $color-text;
      border-radius: 5px;
      background-color: $color-bg;
      color: $color-text;
      cursor: pointer;
      text-align: center;
    }

    #select {
      position: absolute;
      top: 50px;
      left: 0;
      width: 200px;
      background-color: $color-bg;
      border: 1px solid $color-text;
      border-radius: 5px;
      padding: $spacing-5;
      z-index: $z-index-dropdown;
      display: grid;

      div {
        display: grid;
        grid-template-columns: 20px 20px 1fr;
        height: 30px;
        gap: $spacing-1;
        align-items: center;

        button {
          display: grid;
          grid-template-columns: 20px 1fr;
          gap: $spacing-2;
          align-items: center;
          border: 1px solid $color-bg;
          border-radius: 5px;
          background-color: $color-bg;
          color: $color-text;
          cursor: pointer;
        }
      }
    }

    .icon {
      display: grid;
      grid-template-columns: 30px 1fr;
      gap: $spacing-2;
      align-items: center;
    }
  }

  @include mobile {
    #sort {
      grid-template-columns: 1fr;
    }
  }

  .content {
    width: 100%;
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
