<script lang="ts">
  import About from "$lib/components/About.svelte";
  import Marker from "$lib/components/Marker.svelte";
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
  }
</style>
