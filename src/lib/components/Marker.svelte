<script lang="ts">
  export let label: string;
</script>

<div class="marker">
  {label}
</div>

<style lang="scss">
  .marker {
    background: linear-gradient(transparent 65%, $color-highlight 35%);
    width: fit-content;
    height: fit-content;

    font-size: $size-8xl;
    font-weight: $font-thin;
    line-height: 1.1;
    text-transform: uppercase;

    @include mobile {
      font-size: $size-6xl;
    }
  }
</style>
