<script lang="ts">
  import { formatDate } from "$lib/utils/services/datefmt";
  import type { EndPoints } from "$lib/utils/types/microcms";

  // NOTE: 分割代入を行うと, リアクティブ性が失われるので注意
  // let { id, ogpImg, title, publishedAt, tags } = blogData;
  export let blogData: EndPoints["get"]["blogs"];
  const nonInternalTags = blogData.tags.filter((t) => !t.startsWith("_"));
</script>

<div>
  <div
    class="thumbnail"
    style={`view-transition-name: ${blogData.id}-thumbnail`}
  >
    <a href={`/blogs/${blogData.id}`}>
      {#if blogData.ogpImg != null}
        <img
          src={blogData.ogpImg.url}
          alt={blogData.title}
          height={blogData.ogpImg.height}
          width={blogData.ogpImg.width}
        />
      {:else}
        <img src="/images/ogp.png" alt="" width="1200" height="630" />
      {/if}
    </a>
  </div>
  <p>公開：{formatDate(blogData.publishedAt)}</p>
  <ul>
    {#each nonInternalTags as tag}
      <li>{tag}</li>
    {/each}
  </ul>
  <h1><a href={`/blogs/${blogData.id}`}>{blogData.title}</a></h1>
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

    a {
      color: $color-text;
      text-decoration: none;
      opacity: 1;

      &:hover {
        text-decoration: underline;
      }
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
