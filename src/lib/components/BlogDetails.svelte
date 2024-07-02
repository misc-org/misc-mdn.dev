<script lang="ts">
  import { onMount } from "svelte";
  import BlogImage from "./BlogImage.svelte";
  import Marker from "$lib/components/Marker.svelte";
  import {
    rewriteHTML,
    injectComponents,
  } from "$lib/utils/middlewares/rewrite-html";
  import { formatDate } from "$lib/utils/services/datefmt";
  import type { EndPoints } from "$lib/utils/types/microcms";

  export let details: EndPoints["get"]["blogs"];

  onMount(async () => {
    injectComponents();
  });
</script>

<svelte:head>
  <title>MISC - {details.title}</title>
  <meta name="description" content={details.description} />
</svelte:head>

<div class="head">
  <div id="title">
    <h1>
      <Marker>blog</Marker>
    </h1>
    <div>
      <h2>{details.title}</h2>
      <div>
        {#each details.tags as tag}
          <span>{tag}</span>
        {/each}
      </div>
    </div>
  </div>
  <div id="image">
    <BlogImage imageData={details.ogpImg} alt={details.title} />
  </div>
</div>

<article>
  <div id="date-at">
    <p>公開日：{formatDate(details.publishedAt)}</p>
    <p>更新日：{formatDate(details.updatedAt)}</p>
  </div>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html rewriteHTML(details.content)}
</article>

<style lang="scss">
  .head {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;

    #title {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;

      :not(h1) {
        padding-inline: $spacing-2;
      }
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
    }
  }

  @include mobile {
    .head {
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
    margin: $spacing-2 $spacing-10;
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
