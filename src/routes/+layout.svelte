<script lang="ts">
  import extend from "just-extend";
  import { MetaTags } from "svelte-meta-tags";
  import { setupViewTransition } from "sveltekit-view-transition";
  import { page } from "$app/stores";
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";

  import "the-new-css-reset";
  import "@fontsource-variable/m-plus-1";
  import "@fontsource/noto-color-emoji";
  import "@fontsource-variable/jetbrains-mono";
  import "$lib/styles/_global.scss";
  import "$lib/styles/article.scss";

  setupViewTransition();

  export let data;

  $: metaTags = extend(true, {}, data.baseMetaTags, $page.data.pageMetaTags);
</script>

<svelte:head>
  <script>
    var themeMode = localStorage.getItem("misc-mdn.v1.theme-mode");
    if (themeMode === "system") {
      themeMode = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    document.documentElement.setAttribute("data-theme", themeMode);
  </script>
</svelte:head>

<MetaTags {...metaTags} />

<div>
  <Header />
  <main>
    <slot />
  </main>
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
