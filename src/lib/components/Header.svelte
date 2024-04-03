<script lang="ts">
  import Icon from "@iconify/svelte";
  import ThemeSelector from "./ThemeSelector.svelte";
  import logoTitle from "$lib/assets/icons/logo-title";
</script>

<header>
  <a href="/">
    <Icon icon={logoTitle} height={30} />
  </a>
  <div class="nav">
    <div class="theme-selector"><ThemeSelector /></div>
    <nav>
      <a href="/about">About</a>
      <a href="/about">Blogs</a>
    </nav>
  </div>
</header>

<style lang="scss">
  header {
    display: flex;
    justify-content: space-between;
    padding: $spacing-5;

    a {
      display: grid;
      place-items: center;
    }

    .nav {
      display: flex;
      gap: $spacing-5;
      .theme-selector {
        display: grid;
        place-items: center;
      }
      nav {
        display: flex;
        align-items: center;
        gap: $spacing-5;
      }
    }
  }
</style>
