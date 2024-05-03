<script lang="ts">
  import BlogParser from "./BlogParser.svelte";
  import ImagePaeser from "./ImagePaeser.svelte";
  import type { TextFormat, MainElement } from "$lib/utils/services/parser";

  export let content: TextFormat[] | MainElement[] = [];
  export let iconSize: number = 20;
</script>

{#each content as item}
  {#if item.type === "p"}
    <BlogParser content={item.content} {iconSize} />
  {/if}
  {#if item.type === "figure"}
    <ImagePaeser content={item.content} />
  {/if}
{/each}
