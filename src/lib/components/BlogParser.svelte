<script lang="ts">
  import Icon from "@iconify/svelte";
  import logoTitle from "$lib/assets/icons/logo-title";
  import type { TextFormat, MainElement } from "$lib/utils/services/parser";
  export let content: TextFormat[] | MainElement[] = [];
  export let iconSize: number;
</script>

{#each content as subItem}
  {#if subItem.type === "text"}
    {subItem.text}
  {:else if subItem.type === "u"}
    <u>{subItem.content.text}</u>
  {:else if subItem.type === "s"}
    <s>{subItem.content.text}</s>
  {:else if subItem.type === "em"}
    <em>{subItem.content.text}</em>
  {:else if subItem.type === "strong"}
    <strong>{subItem.content.text}</strong>
  {:else if subItem.type === "br"}
    <br />
  {:else if subItem.type === "code"}
    <code>{subItem.content.text}</code>
  {:else if subItem.type === "a"}
    <a href={subItem.href} target="_blank" rel="noopener noreferrer">
      {subItem.content.text}
    </a>
  {:else if subItem.type === "span"}
    {#if subItem.content.size}
      {#if subItem.content.content === "logo-title"}
        <Icon icon={logoTitle} width={iconSize} height={iconSize} />
      {:else}
        <Icon
          icon={subItem.content.content}
          width={iconSize + subItem.content.size}
          height={iconSize + subItem.content.size}
        />
      {/if}
    {:else}
      {#if subItem.content.content === "logo-title"}
        <Icon icon={logoTitle} width={iconSize} height={iconSize} />
      {:else}
        <Icon icon={subItem.content.content} width={iconSize} height={iconSize} />
      {/if}
    {/if}
  {/if}
{/each}
