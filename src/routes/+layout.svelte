<script lang="ts">
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";

  import "the-new-css-reset";
  import "@fontsource-variable/m-plus-1";
  import "@fontsource/noto-color-emoji";
  import "@fontsource-variable/jetbrains-mono";
  import "$lib/styles/global.scss";
</script>

<div>
  <Header />
  <slot />
  <Footer />
</div>

<style lang="scss">
  div {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: auto 1fr auto;
    height: 100%;
    min-height: 100vh;
  }
</style>
