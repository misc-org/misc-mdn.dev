<script>
  import Icon from "@iconify/svelte";
  import logoTitle from "$lib/assets/icons/logo-title";
</script>

<footer>
  <a href="/" title="トップページへ">
    <Icon icon={logoTitle} height={30} />
  </a>
  <p>MISC © 2024 Copyright.</p>
  <div class="circle-container">
    <div class="circle">
      <a href="https://github.com/misc-org">
        <Icon icon="mdi:github" height={40}/>
      </a>
    </div>
  </div>
</footer>

<style lang="scss">
  footer {
    padding: $spacing-5;
    align-items: center;
    gap: $spacing-5;
    margin-inline: auto;
    display: flex;

    a {
      display: grid;
      place-items: center;
    }

    p {
      text-align: center;
    }

    .circle-container {
      display: flex;
      gap: $spacing-5;

      .circle {
        width: 40px;
        height: 40px;

        a {
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
          color: $color-text;
        }
      }
    }
  }
</style>
