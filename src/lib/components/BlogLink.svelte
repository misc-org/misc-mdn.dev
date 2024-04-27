<script lang="ts">
  import { formatDate } from "$lib/utils/services/datefmt";
  import type { EndPoints } from "$lib/utils/types/microcms";

  export let blogData: EndPoints["get"]["blogs"];
  $: ({ id, title, publishedAt, tags, ogpImg } = blogData);
</script>

<div>
  <div class="thumbnail">
    <a href={`/blogs/${id}`}>
      {#if ogpImg}
        <img
          src={ogpImg.url}
          alt={title}
          height={ogpImg.height}
          width={ogpImg.width}
        />
      {:else}
        <img src="https://placehold.jp/1200x630.png" alt="thumbnail" />
      {/if}
    </a>
  </div>
  <p>公開：{formatDate(publishedAt)}</p>
  <ul>
    {#each tags as tag (tag)}
      <li>{tag}</li>
    {/each}
  </ul>
  <h3><a href={`/blogs/${id}`}>{title}</a></h3>
</div>

<style lang="scss">
  .thumbnail {
    aspect-ratio: 100 / 52.5;
    border-radius: $radii-md;
    text-align: center;
    overflow: hidden;

    a {
      display: block;
      width: 100%;
      height: 100%;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease-in-out;

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  h3 {
    margin: $spacing-2 0;

    &:hover {
      a {
        text-decoration: underline;
      }
    }

    a {
      color: $color-text;
      text-decoration: none;
      opacity: 1;
    }
  }

  p {
    font-size: 0.8em;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    margin-top: $spacing-2;
    list-style: none;
  }

  li {
    background-color: #d9d9d9;
    color: #333;
    border-radius: 5px;
    padding: 5px 10px;
    margin: 5px;
    font-size: 0.8em;
  }
</style>
