<script lang="ts">
  import Icon from "@iconify/svelte";
  import logoTitle from "$lib/assets/icons/logo-title";
</script>

<header>
  <a href="/">
    <Icon icon={logoTitle} height={30} />
  </a>
  <div>
    <div class="theme-selector">★</div>
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
    padding: 2rem;

    div,
    nav {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  }
</style>
