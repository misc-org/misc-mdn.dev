<script lang="ts">
  import { CodeBlock } from "@skeletonlabs/skeleton";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import BlogParser from "$lib/components/BlogParser.svelte";
  import Marker from "$lib/components/Marker.svelte";
  import { parser, type ContentItem } from "$lib/utils/services/blogParser";
  import { formatDate } from "$lib/utils/services/datefmt";
  import { setupHighlightJs } from "$lib/utils/services/highlight";

  setupHighlightJs();

  export let data: PageData;

  let isContentLoaded: boolean = false;
  let content: ContentItem[] = [];

  onMount(async () => {
    parser(data.detail?.content, content);
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
      {#each content as item (item)}
        {#if item.type === "code" && "filename" in item}
          <span class="code-block-content">
            {#if item.filename}
              <p class="filename">{item.filename}</p>
            {/if}
            <CodeBlock language={item.language} code={item.code} />
          </span>
        {:else if item.type === "h2"}
          <h2>{item.text}</h2>
        {:else if item.type === "h3"}
          <h3>{item.text}</h3>
        {:else if item.type === "paragraph"}
          <p>
            <BlogParser content={item.content} {iconSize} />
          </p>
        {:else if item.type === "ul"}
          <ul>
            {#each item.content as items (items)}
              {#if items.type === "listItem" && "content" in items}
                <li>
                  <BlogParser content={items.content} {iconSize} />
                </li>
              {/if}
            {/each}
          </ul>
        {:else if item.type === "ol"}
          <ol>
            {#each item.content as items (items)}
              {#if items.type === "listItem" && "content" in items}
                <li>
                  <BlogParser content={items.content} {iconSize} />
                </li>
              {/if}
            {/each}
          </ol>
        {:else if item.type === "table"}
          <table>
            {#each item.content as items (items)}
              {#if items.type === "tableRow" && "content" in items}
                <tr>
                  {#each items.content as row (row)}
                    {#if row.type === "th" && "content" in row}
                      <th>
                        {#each row.content as cell}
                          {#if cell.type === "paragraph" && "content" in cell}
                            <div>
                              <BlogParser content={cell.content} {iconSize} />
                            </div>
                          {/if}
                        {/each}
                      </th>
                    {:else if row.type === "td" && "content" in row}
                      <td>
                        {#each row.content as cell}
                          {#if cell.type === "paragraph" && "content" in cell}
                            <div>
                              <BlogParser content={cell.content} {iconSize} />
                            </div>
                          {/if}
                        {/each}
                      </td>
                    {/if}
                  {/each}
                </tr>
              {/if}
            {/each}
          </table>
        {:else if item.type === "html"}
          {@html item.html}
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
