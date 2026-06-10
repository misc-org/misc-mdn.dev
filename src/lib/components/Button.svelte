<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    onclick,
    children,
  }: {
    onclick?: (event: MouseEvent) => void;
    children: Snippet;
  } = $props();
</script>

<div id="next">
  <button {onclick}>{@render children()}</button>
</div>

<style lang="scss">
  #next {
    margin: 0 auto;
    display: grid;
    gap: $spacing-8;
    justify-content: center;
    margin-bottom: $spacing-20;

    button {
      padding: $spacing-5;
      border: 1px solid $color-bg;
      border-radius: 5px;
      background-color: $color-bg;
      color: $color-text;
      cursor: pointer;
      transition: all 0.3s ease-in-out;

      &:hover {
        background-color: $color-text;
        color: $color-bg;
      }
    }
  }
</style>
