<script lang="ts">
</script>

<div class="marker">
  <slot />
</div>

<style lang="scss">
  .marker {
    background: linear-gradient(transparent 65%, $color-highlight 35%);
    width: fit-content;

    font-size: $size-8xl;
    font-weight: $font-thin;
    line-height: 1.1;
    text-transform: uppercase;
  }
</style>
