<script lang="ts">
  import { page } from "$app/stores";
</script>

<div>
  <div class="status">{$page.status}</div>
  <hr />
  <h1 class="message">{$page.error?.message}</h1>
</div>

<style lang="scss">
  div {
    display: grid;
    place-items: center;
    place-content: center;
    gap: 0.5rem;
    height: 100%;
    width: 100%;

    > .status {
      font-size: 2rem;
      font-weight: bold;
    }

    > hr {
      width: 100%;
      border: none;
      border-top: 1px solid black;
    }

    > .message {
      font-size: 1.5rem;
    }
  }
</style>
