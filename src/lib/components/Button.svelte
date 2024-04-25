<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch("click");
  }
</script>

<button on:click={handleClick}>
  <slot />
</button>

<style lang="scss">
  button {
    background-color: #fff;
    border: 1px solid #000;
    border-radius: 4px;
    color: #000;
    cursor: pointer;
    font-size: 1rem;
    padding: 0.5rem 1rem;
  }
</style>
