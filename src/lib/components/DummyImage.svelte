<script lang="ts">
  import Icon from "@iconify/svelte";
  import logo from "$lib/assets/icons/logo-title";
</script>

<div>
  <Icon icon={logo} width="100" height="100" color="black" />
</div>

<style lang="scss">
  div {
    background-color: $color-neutral;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    transition: transform 0.5s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }
  }
</style>
