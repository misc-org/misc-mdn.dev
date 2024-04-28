<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let state: boolean = false;

  function handleClick() {
    state = !state;
    dispatch("click");
  }
</script>

<button
  class:updown-on={state}
  class:updown-off={!state}
  on:click={handleClick}
>
  <span class:updown-on={state} class:updown-off={!state}><span></span></span>
  <div><slot /></div>
</button>

<style lang="scss">
  button {
    border: 3px solid #d9d9d9;
    border-radius: 100vh;
    color: $color-text;
    cursor: pointer;
    font-size: $radii-2xl;
    white-space: nowrap;
    padding: 5px;
    padding-right: 12px;
    display: grid;
    gap: 10px;
    grid-template-columns: 30px 1fr;
    transition: all 0.3s ease-in-out;

    &.updown-on,
    &.updown-off {
      background-color: #d9d9d9;

      div {
        color: #333;
        padding-left: $spacing-2;
        text-align: left;
      }
    }

    span {
      display: block;
      position: relative;
      width: 30px;
      height: 30px;
      border-radius: 100vh;
      transition: all 0.3s ease-in-out;
      &.updown-on,
      &.updown-off {
        background-color: #f3f3f3;
      }
    }

    span.updown-on > span,
    span.updown-off > span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #333;
      line-height: 1;
      position: relative;
      width: 2px;
      height: 20px;
      background: currentColor;
    }

    span.updown-on::before,
    span.updown-off::before {
      content: "";
      color: #333;
      width: 12px;
      height: 12px;
      transform: rotate(-45deg);
      top: 3px;
      right: 50%;
      border: 2px solid currentColor;
      border-left: 0;
      border-bottom: 0;
      transform-origin: top right;
      position: absolute;
      box-sizing: border-box;
    }

    span.updown-on {
      transform: rotate(0deg);
    }

    span.updown-off {
      transform: rotate(180deg);
    }
  }
</style>
