<script lang="ts">
  import Icon from "@iconify/svelte";
  import { Checkbox, Label } from "bits-ui";
  import { createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";
  import Tag from "./Tag.svelte";
  import BlogLink from "$lib/components/BlogLink.svelte";
  import { getEntries } from "$lib/utils/consts";
  import { tags } from "$lib/utils/types/blogs";
  import type { EndPoints } from "$lib/utils/types/microcms";

  export let more: boolean = false;
  export let blogs;
  export let limit: number;

  let blogListContents: EndPoints["get"]["blogs"][] = blogs.blogList.contents;

  console.log(blogListContents);

  let sortKey: boolean = false;
  let filterTag: (typeof tags)[keyof typeof tags]["title"] = "All";

  let page = 1;

  $: start = (page - 1) * limit;
  $: end = start + limit;

  const dispatch = createEventDispatcher();

  function handlePublishedAtClick() {
    sortKey = !sortKey;
    dispatch("click");
  }

  $: sortedAndFilteredBlogs = [...blogListContents]
    .filter((blog) => filterTag === "All" || blog.tags.includes(filterTag))
    .sort((a, b) => {
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

  $: pagedBlogs = sortedAndFilteredBlogs.slice(start, end);

  $: morePage = sortedAndFilteredBlogs.length > end;

  let isOpen = false;

  function toggleMenu() {
    isOpen = !isOpen;
  }

  const items = getEntries(tags).map(([value, { title, icon }]) => ({
    value,
    label: title,
    icon,
  }));

  $: tagChecked = items.map((item) => ({ ...item, checked: undefined }));
  $: console.log(tagChecked);
</script>

{#if more}
  <div id="sort">
    <button id="taged" on:click={toggleMenu}>tag</button>
    {#if isOpen}
      <div id="select" transition:slide={{ duration: 200 }}>
        {#each items as { value, label, icon }}
          <div class="flex items-center space-x-3">
            <Checkbox.Root
              id={value}
              aria-labelledby="terms-label"
              class="peer inline-flex size-[25px] items-center justify-center rounded-md border border-muted bg-foreground transition-all duration-150 ease-in-out active:scale-98 data-[state=unchecked]:border-border-input data-[state=unchecked]:bg-background data-[state=unchecked]:hover:border-dark-40"
              checked={tagChecked}
            >
              <Checkbox.Indicator
                let:isChecked
                class="inline-flex items-center justify-center text-background"
              >
                {#if isChecked}
                  <Icon icon="mdi:check" />
                {/if}
              </Checkbox.Indicator>
            </Checkbox.Root>
            <Label.Root
              id="${value}-label"
              for={value}
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              <div class="icon">
                <Icon {icon} height={23} />
                <p>{label}</p>
              </div>
            </Label.Root>
          </div>
        {/each}
      </div>
    {/if}
    <Tag on:click={handlePublishedAtClick}>投稿日</Tag>
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
        grid-template-columns: 20px 1fr;
        gap: $spacing-1;
        align-items: center;
      }
    }

    .icon {
      display: grid;
      grid-template-columns: 30px 1fr;
      gap: $spacing-2;
      align-items: center;
    }
  }

  @media (max-width: 768px) {
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
