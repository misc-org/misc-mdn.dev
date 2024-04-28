<script lang="ts">
  import { onMount } from "svelte";
  import { MetaTags } from "svelte-meta-tags";
  import type { PageData } from "./$types";
  import { INFO } from "$lib/assets/info";
  import About from "$lib/components/About.svelte";
  import Arrow from "$lib/components/Arrow.svelte";
  import BlogPage from "$lib/components/BlogPage.svelte";
  import Button from "$lib/components/Button.svelte";
  import Marker from "$lib/components/Marker.svelte";

  export let data: PageData;

  let limit: number;

  onMount(() => {
    const width = window.innerWidth;
    if (width <= 480) {
      limit = 4;
    } else if (width <= 768) {
      limit = 6;
    } else {
      limit = 8;
    }
  });
</script>

<MetaTags title={INFO.about.title} />

<div class="landing">
  <p>夢が現実になる、<wbr />未来への一歩を</p>
  <div class="arrow">
    <Arrow />
    <p>scroll</p>
  </div>
</div>

<h2>
  <Marker>about</Marker>
</h2>

<About />

<section id="arrow">
  <a href="/about"><Button>Show more →</Button></a>
  <span></span>
</section>

<h2>
  <Marker>blogs</Marker>
</h2>

<section>
  <BlogPage more={false} blogs={data} {limit} />
</section>

<section>
  <a href="/blogs"><Button>Show more →</Button></a>
  <span></span>
</section>

<style lang="scss">
  $header-height: calc(30px + $spacing-5 * 2);

  .landing {
    height: calc(100vh - $header-height);
    width: 100%;
    display: grid;
    place-items: center;
    position: relative;

    > p {
      font-size: 2rem;
      word-break: keep-all;
      text-align: center;
      font-weight: $font-extralight;
      letter-spacing: 0.5rem;
      padding-inline: $spacing-5;

      @include mobile {
        font-size: $size-2xl;
      }
    }

    > .arrow {
      position: absolute;
      bottom: $spacing-5;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: $spacing-1;
      > p {
        letter-spacing: $spacing-1;
        font-size: $size-xs;
        font-weight: $font-bold;
        text-transform: uppercase;
      }
    }
  }

  h2 {
    padding-block: $spacing-10;
  }

  #arrow {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $spacing-5;

    > p {
      font-size: $size-md;
      line-height: 1.5;
    }
  }
</style>
