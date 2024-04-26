<script lang="ts">
  import Marker from "$lib/components/Marker.svelte";
  import About from "$lib/components/About.svelte";
</script>

<h2>
  <Marker>about</Marker>
</h2>

<div>
  <About />
</div>

<style lang="scss">
  div {
    display: grid;
    place-items: center;

    article {
      padding-block: $spacing-10;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: $spacing-10;

      > section {
        display: flex;
        flex-direction: column;
        gap: $spacing-5;

        > h3 {
          font-weight: $font-extrabold;
        }
      }
    }
  }
</style>
