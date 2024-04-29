<script lang="ts">
  import type { PageData } from "./$types";
  import Marker from "$lib/components/Marker.svelte";
  import { rewriteHTML } from "$lib/utils/middlewares/rewrite-html";
  import { formatDate } from "$lib/utils/services/datefmt";

  export let data: PageData;
</script>

<div>
  <div id="title">
    <h1>
      <Marker label='blog' />
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
</div>

<article>
  <div id="date-at">
    <p>公開日：{formatDate(data.detail.publishedAt)}</p>
    <p>更新日：{formatDate(data.detail.updatedAt)}</p>
  </div>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html rewriteHTML(data.detail.content)}
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
        border: 1px solid #ccc;
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
