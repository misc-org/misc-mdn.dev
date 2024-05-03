<script lang="ts">
  import BlogParser from "./BlogParser.svelte";
  import type { TextFormat, MainElement } from "$lib/utils/services/parser";

  export let content: TextFormat[] | MainElement[] = [];
  export let iconSize: number = 20;
</script>

{#each content as item}
  {#if item.type === "p"}
    <BlogParser content={item.content} {iconSize} />
  {/if}
  {#if item.type === "figure"}
    {#if item.content.a}
      <a href={item.content.a} target="_blank" rel="noopener noreferrer">
        <img src={item.content.img} alt={item.content.alt} />
      </a>
    {:else}
      <img src={item.content.img} alt={item.content.alt} />
    {/if}
  {/if}
{/each}
