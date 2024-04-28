<script lang="ts">
  import Icon from "@iconify/svelte";
  import ThemeSelector from "./ThemeSelector.svelte";
  import logoTitle from "$lib/assets/icons/logo-title";
</script>

<header>
  <a href="/" title="トップページへ">
    <Icon icon={logoTitle} height={30} />
  </a>
  <div class="nav">
    <div class="theme-selector"><ThemeSelector /></div>
    <nav>
      <a href="/about" title="About ページへ">About</a>
      <a href="/blogs" title="Blogs ページへ">Blogs</a>
    </nav>
  </div>
</header>

<style lang="scss">
  header {
    display: flex;
    position: sticky;
    top: 0;
    z-index: $z-index-header;
    background-color: $color-bg;
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

        @include mobile {
          gap: $spacing-3;
        }
      }
    }
  }
</style>
