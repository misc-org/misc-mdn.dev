<script lang="ts">
  import type { PageData } from "./$types";
  import BlogDetails from "$lib/components/BlogDetails.svelte";

  let { data }: { data: PageData } = $props();
</script>

<BlogDetails details={data.detail} />
