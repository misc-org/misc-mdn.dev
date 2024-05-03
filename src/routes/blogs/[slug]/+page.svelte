<script lang="ts">
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import BlogParser from "$lib/components/BlogParser.svelte";
  import Marker from "$lib/components/Marker.svelte";
  import TableParser from "$lib/components/TableParser.svelte";
  import { formatDate } from "$lib/utils/services/datefmt";
  import { setupHighlightJs } from "$lib/utils/services/highlight";
  import {
    parser,
    type MainElement,
  } from "$lib/utils/services/parser";

  setupHighlightJs();

  export let data: PageData;

  let isContentLoaded: boolean = false;
  let content: MainElement[] = [];

  onMount(async () => {
    parser(data.detail?.content, content);
    console.log(content);
    isContentLoaded = true;
  });

  let iconSize: number = 20;

  onMount(() => {
    const width = window.innerWidth;
    if (width <= 480) {
      iconSize = 15;
    } else if (width <= 768) {
      iconSize = 15;
    } else {
      iconSize = 20;
    }
  });
</script>

<div>
  {#if data && data.detail}
    <div id="title">
      <h1>
        <Marker>blog</Marker>
      </h1>
      <div>
        <h2>{data.detail.title}</h2>
        <div>
          {#each data.detail.tags as tag}
            <span>{tag}</span>
          {/each}
        </div>
      </div>
    </div>
    <div id="image">
      <img
        src={data.detail.ogpImg.url}
        alt={data.detail.title}
        height={data.detail.ogpImg.height}
        width={data.detail.ogpImg.width}
      />
    </div>
  {/if}
</div>

<article>
  {#if data && data.detail}
    <div id="date-at">
      <p>公開日：{formatDate(data.detail.publishedAt)}</p>
      <p>更新日：{formatDate(data.detail.updatedAt)}</p>
    </div>
    {#if isContentLoaded}
      {#each content as item}
        {#if item.type === "h2"}
          <h2>
            {#each item.content as subItem}
              {#if subItem.type === "text"}
                {subItem.text}
              {/if}
            {/each}
          </h2>
        {:else if item.type === "h3"}
          <h3>
            {#each item.content as subItem}
              {#if subItem.type === "text"}
                {subItem.text}
              {/if}
            {/each}
          </h3>
        {:else if item.type === "h4"}
          <h4>
            {#each item.content as subItem}
              {#if subItem.type === "text"}
                {subItem.text}
              {/if}
            {/each}
          </h4>
        {:else if item.type === "p"}
          <p>
            <BlogParser content={item.content} {iconSize} />
          </p>
        {:else if item.type === "pre"}
          <pre>
            <code>
              {item.content}
            </code>
        </pre>
        {:else if item.type === "figure"}
          {#if item.content.a}
            <figure>
              <a
                href={item.content.a}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={item.content.img} alt="" />
              </a>
            </figure>
          {:else}
            <figure>
              <img src={item.content.img} alt="" />
            </figure>
          {/if}
        {:else if item.type === "ul"}
          <ul>
            {#each item.content as subItem}
              <li>
                {#if Array.isArray(subItem.li)}
                  <BlogParser content={subItem.li} {iconSize} />
                {/if}
              </li>
            {/each}
          </ul>
        {:else if item.type === "ol"}
          <ol>
            {#each item.content as subItem}
              <li>
                {#if Array.isArray(subItem.li)}
                  <BlogParser content={subItem.li} {iconSize} />
                {/if}
              </li>
            {/each}
          </ol>
        {:else if item.type === "blockquote"}
          <blockquote>
            {#each item.content as subItem}
              {#if subItem.type === "p"}
                <p>
                  <BlogParser content={subItem.content} {iconSize} />
                </p>
              {/if}
            {/each}
          </blockquote>
        {:else if item.type === "table"}
          <table>
            {#each item.content.tbody as subItem}
              <tr>
                {#each subItem.content as subSubItem}
                  {#if subSubItem.type === "th"}
                    <th>
                      <TableParser content={subSubItem.content} {iconSize} />
                    </th>
                  {:else if subSubItem.type === "td"}
                    <td>
                      <TableParser content={subSubItem.content} {iconSize} />
                    </td>
                  {/if}
                {/each}
              </tr>
            {/each}
          </table>
        {/if}
      {/each}
    {/if}
  {/if}
</article>

<style lang="scss">
  div {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;

    #title {
      padding: 20px;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;

      div {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr auto;
        align-items: center;
        gap: 10px;

        div {
          display: flex;
        }
      }

      h2 {
        font-size: 1.5rem;
        margin-bottom: 10px;
      }

      span {
        margin-right: 10px;
        padding: 5px 10px;
        border: 1px solid $color-static-gray;
        border-radius: 5px;
      }
    }

    #image {
      display: block;
      padding: $spacing-5;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5px;
      }
    }
  }

  @include mobile {
    div {
      grid-template-columns: 1fr;

      #title {
        padding: 10px;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;

        div {
          grid-template-columns: 1fr;
          grid-template-rows: auto auto;
          gap: 5px;
        }

        h2 {
          font-size: $size-md;
          margin-top: $spacing-5;
        }

        span {
          margin-right: 5px;
          padding: 2px 5px;
          border-radius: 3px;
          font-size: $size-xs;
        }
      }

      #image {
        padding: 10px;
      }
    }
  }

  article {
    width: 100%;
    margin: auto;
    margin-top: $spacing-10;
    margin-bottom: $spacing-10;
    padding: auto 0;
    line-height: 1.8;
    text-align: justify;

    #date-at {
      display: flex;
      flex-direction: column;
    }
  }

  @include mobile {
    article {
      :global(p) {
        font-size: $size-xs;
      }
    }
  }
</style>
