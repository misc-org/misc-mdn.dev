<script lang="ts">
  import type { EndPoints } from "$lib/utils/types/microcms";

  export let blogData: EndPoints["get"]["blogs"];
  const { id, title, publishedAt, tags, ogpImg } = blogData;

  function formatDate(dateString: string | number | Date) {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }
</script>

<div>
  <div class="ogp">
    <a href={`/blogs/${id}`}>
      {#if ogpImg}
        <img src={ogpImg.url} alt={title} />
      {:else}
        <img src="https://placehold.jp/1200x630.png" alt="ogp" />
      {/if}
    </a>
  </div>
  <p>公開：{formatDate(publishedAt)}</p>
  <ul>
    {#each tags as tag (tag)}
      <li>{tag}</li>
    {/each}
  </ul>
  <a href={`/blogs/${id}`}><h3>{title}</h3></a>
</div>

<style lang="scss">
  .ogp {
    width: 100%;
    aspect-ratio: 100 / 52.5;
    border-radius: 5px;
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
      text-decoration: underline;
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
