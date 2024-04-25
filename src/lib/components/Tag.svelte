<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let state: boolean = false;
  export let type: "button" | "updown" = "button";

  function handleClick() {
    dispatch("click");
  }
</script>

<button
  class:button-on={state && type == "button"}
  class:button-off={!state && type == "button"}
  class:updown-on={state && type == "updown"}
  class:updown-off={!state && type == "updown"}
  on:click={handleClick}
>
  <span
    class:button-on={state && type == "button"}
    class:button-off={!state && type == "button"}
    class:updown-on={state && type == "updown"}
    class:updown-off={!state && type == "updown"}
    >{#if type == "updown"}
      <span></span>
    {/if}</span
  >
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

    &.button-on {
      background-color: #d9d9d9;

      div {
        color: #333;
      }
    }

    &.updown-on,
    &.updown-off {
      background-color: #d9d9d9;

      div {
        color: #333;
      }
    }

    span {
      display: block;
      position: relative;
      width: 30px;
      height: 30px;
      border-radius: 100vh;
      transition: all 0.3s ease-in-out;

      &.button-on {
        background-color: #f3f3f3;

        &::before,
        &::after {
          background: #333;
        }
      }

      &.button-off {
        background-color: #d9d9d9;

        &::before,
        &::after {
          background: #d9d9d9;
        }
      }

      &.updown-on,
      &.updown-off {
        background-color: #f3f3f3;
      }
    }

    span.button-on::before,
    span.button-on::after,
    span.button-off::before,
    span.button-off::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 20px;
      transition: all 0.3s ease-in-out;
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
      transform: rotate(180deg);
    }

    span.updown-off {
      transform: rotate(0deg);
    }

    span.button-on::before,
    span.button-off::before {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    span.button-on::after,
    span.button-off::after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
</style>
