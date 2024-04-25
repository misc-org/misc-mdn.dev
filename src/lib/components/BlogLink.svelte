<script lang="ts">
  export let id: string;
  export let title: string;
  export let publishedAt: string;
  export let tags: string[];
  export let ogpImg: { url: string } | null;

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
        <img src="https://placehold.jp/150x150.png" alt="ogp" />
      {/if}
    </a>
  </div>
  <a href={`/blogs/${id}`}><h3>{title}</h3></a>
  <p>公開：{formatDate(publishedAt)}</p>
  <ul>
    {#each tags as tag (tag)}
      <li>{tag}</li>
    {/each}
  </ul>
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
</style>
