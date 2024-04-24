<script lang="ts">
  import type { PageData } from "./$types";
  import Marker from "$lib/components/Marker.svelte";

  export let data: PageData;
  let blogListContents = data.blogList.contents;

  function formatDate(dateString: string | number | Date) {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }
</script>

<h1>
  <Marker>blogs</Marker>
</h1>

<div class="content">
  {#each blogListContents as blog}
    <div>
      <div class="ogp">
        <a href={`/blogs/${blog.id}`}>
          {#if blog.ogpImg}
            <img src={blog.ogpImg.url} alt={blog.title} />
          {:else}
            <img src="https://placehold.jp/150x150.png" alt="ogp" />
          {/if}
        </a>
      </div>
      <a href={`/blogs/${blog.id}`}><h3>{blog.title}</h3></a>
      <p>公開：{formatDate(blog.publishedAt)}</p>
      <ul>
        {#each blog.tags as tag (tag)}
          <li>{tag}</li>
        {/each}
      </ul>
    </div>
  {/each}
</div>

<style lang="scss">
  .content {
    width: 100%;
    margin: $spacing-20 0;
    padding: 0 $spacing-8;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: $spacing-8;
  }
  .blog-item {
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 10px;
  }
  .ogp {
    width: 100%;
    height: 200px;
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
