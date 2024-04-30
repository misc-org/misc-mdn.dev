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
  {:else if text.type === "formattedText" && "text" in text}
    {#if text.format === "em"}
      <em>{text.text}</em>
    {:else if text.format === "strong"}
      <strong>{text.text}</strong>
    {:else if text.format === "u"}
      <u>{text.text}</u>
    {:else if text.format === "s"}
      <s>{text.text}</s>
    {:else if text.format === "code"}
      <code>{text.text}</code>
    {/if}
  {:else if text.type === "link" && "href" in text && "text" in text}
    <a href={text.href} target="_blank" rel="noopener noreferrer">
      {text.text}
    </a>
  {:else if text.type === "image" && "src" in text && "alt" in text}
    <figure>
      {#if text.href}
        <a href={text.href} target="_blank" rel="noopener noreferrer">
          <img src={text.src} alt={text.alt} />
        </a>
      {:else}
        <img src={text.src} alt={text.alt} />
      {/if}
    </figure>
  {/if}
{/each}
