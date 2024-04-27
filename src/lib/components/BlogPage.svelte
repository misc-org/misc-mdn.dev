<script lang="ts">
  import Icon from "@iconify/svelte";
  import { Select } from "bits-ui";
  import { createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";
  import Tag from "./Tag.svelte";
  import BlogLink from "$lib/components/BlogLink.svelte";
  import { getEntries } from "$lib/utils/consts";
  import { tags } from "$lib/utils/types/blogs";
  import type { EndPoints } from "$lib/utils/types/microcms";

  export let more: boolean = false;
  export let blogs: EndPoints["gets"]["blogs"];
  export let limit: number = 10;

  let blogListContents = blogs.contents;

  let sortKey: boolean = false;
  let filterTag: typeof tags[keyof typeof tags]['title'] = "All";

  console.log(blogs.contents);

  let page = 1;

  $: start = (page - 1) * limit;
  $: end = start + limit;

  const dispatch = createEventDispatcher();

  function handlePublishedAtClick() {
    sortKey = !sortKey;
    dispatch("click");
  }

  $: sortedAndFilteredBlogs = blogListContents
    ? blogListContents
        .filter((blog) => filterTag === "All" || blog.tags.includes(filterTag))
        .sort((a, b) => {
          switch (sortKey) {
            case true:
              return a.publishedAt.localeCompare(b.publishedAt);
            case false:
              return b.publishedAt.localeCompare(a.publishedAt);
            default:
              return 0;
          }
        })
        .slice(start, end)
    : [];

  $: morePage = blogListContents ? blogListContents.length > end : false;

  let selectedIcon = "";

  $: {
    selectedIcon = "";
    for (const key in tags) {
      if (tags[key].title === filterTag) {
        selectedIcon = tags[key].icon;
        break;
      }
    }
  }

  const items = getEntries(tags).map(([value, { title, icon }]) => ({
    value,
    label: title,
    icon,
  }));
</script>

{#if more}
  <div id="sort">
    <Select.Root {items} selected={{ value: filterTag }}>
      <Select.Trigger title="タグを選択する">
        <div class="icon">
          <Icon icon={selectedIcon} height={23} />
          <p>{filterTag}</p>
        </div>
      </Select.Trigger>
      <Select.Content
        class="select-content"
        sameWidth={false}
        sideOffset={8}
        transition={slide}
        transitionConfig={{ duration: 300 }}
      >
        {#each items as { label, icon, value }}
          <Select.Item
            class="select-item"
            {value}
            {label}
            on:click={() => {
              filterTag = label;
            }}
          >
            <Icon {icon} />
            <p>{label}</p>
            <div class="icon">
              <Select.ItemIndicator
                class="select-item-indicator"
                asChild={false}
              >
                <Icon icon="mdi:check" />
              </Select.ItemIndicator>
            </div>
          </Select.Item>
        {/each}
        <Select.Input name="favoriteFruit" />
      </Select.Content>
    </Select.Root>
    <Tag on:click={handlePublishedAtClick}>投稿日</Tag>
  </div>
{/if}

<div class="content">
  {#if sortedAndFilteredBlogs.length === 0}
    <p id="no-page">ページは存在しません</p>
  {:else}
    {#await blogs then value}
      {#each value.contents as blogData}
        <BlogLink {blogData} />
      {/each}
    {:catch error}
      <p>Error: {error.message}</p>
    {/await}
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
