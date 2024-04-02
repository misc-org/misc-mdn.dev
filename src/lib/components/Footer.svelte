<script>
  import Icon from "@iconify/svelte";
  import logoTitle from "$lib/assets/icons/logo-title";
</script>

<footer>
  <a href="/">
    <Icon icon={logoTitle} height={30} />
  </a>
  <p>MISC © 2024 Copyright.</p>
  <div class="circle-container">
    <div class="circle" />
    <div class="circle" />
  </div>
</footer>

<style lang="scss">
  footer {
    padding: 2rem;
    align-items: center;
    gap: 2rem;
    margin-inline: auto;
    display: flex;

    p {
      text-align: center;
    }

    .circle-container {
      display: flex;
      gap: 1rem;

      .circle {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: $color-neutral;
      }
    }
  }
</style>
