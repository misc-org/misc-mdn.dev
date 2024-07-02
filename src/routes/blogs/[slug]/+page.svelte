<script lang="ts">
  import type { PageData } from "./$types";
  import BlogDetails from "$lib/components/BlogDetails.svelte";

  export let data: PageData;
</script>

<BlogDetails details={data.detail} />
