<script lang="ts">
  import Icon from "@iconify/svelte";
  import BlogDetails from "$lib/components/BlogDetails.svelte";
  import { getDraftContentDetail } from "$lib/utils/services/microcms";
  import type { EndPoints } from "$lib/utils/types/microcms";

  let blogData: EndPoints["get"]["blogs"];

  async function fetchDraftContent() {
    const url = new URL(document.location.href);

    const id = url.searchParams.get("id");
    const key = url.searchParams.get("key");

    if (id == null || id === "") {
      throw new Error("Query parameter `id` is required.");
    }

    if (key == null || key === "") {
      throw new Error("Query parameter `key` is required.");
    }

    blogData = await getDraftContentDetail("blogs", id, key);
  }
</script>

<div class="draft-warning">
  <div class="icon">
    <Icon icon="mdi:alert" height="1rem" />
  </div>
  <p>注意: このページは現在, microCMS からの下書きを表示しています！</p>
</div>

{#await fetchDraftContent()}
  <p class="message">下書きの取得中...</p>
{:then}
  <BlogDetails details={blogData} />
{:catch error}
  <p class="message error">
    下書きの取得に失敗しました:<br />
    <code>{error.message}</code>
  </p>
{/await}

<style lang="scss">
  .draft-warning {
    width: 100%;
    position: sticky;
    top: 78px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $color-text;
    padding: $spacing-3;
    color: $color-bg;
    gap: $spacing-3;
  }

  .message {
    width: 100%;
    text-align: center;
    padding: $spacing-3;

    &.error {
      color: red;
    }

    > code {
      font-weight: 500;
    }
  }
</style>
