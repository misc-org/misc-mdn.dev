<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let label: string;

  function handleClick() {
    dispatch("click");
  }
</script>

<div id="next">
  <button on:click={handleClick}>{label}</button>
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
