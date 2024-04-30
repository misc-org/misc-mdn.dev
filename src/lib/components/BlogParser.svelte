<script lang="ts">
  import Icon from "@iconify/svelte";
  import logoTitle from "$lib/assets/icons/logo-title";
  import type { ContentItem } from "$lib/utils/services/blogParser";
  export let content: ContentItem[] = [];
  export let iconSize: number = 20;
</script>

{#each content as text (text)}
  {#if text.type === "text" && text.text === "<br>"}
    <br />
  {:else if text.type === "text"}
    {text.text}
  {:else if text.type === "icon"}
    {#if text.content === "logoTitle"}
      <Icon icon={logoTitle} height={iconSize} />
    {:else}
      <div>
        <Icon icon={text.content} height={iconSize} />
      </div>
    {/if}
  {:else if text.type === "code" && "text" in text}
    <code>{text.text}</code>
  {/if}
{/each}
