<script lang="ts">
  export let strokeWidthPx = 2;
  export let arrowHeightPx = 50;
  export let arrowTailSizePx = 10;
  export let direction: "top" | "right" | "left" | "bottom" = "bottom";

  const rotate = {
    top: 0,
    right: 90,
    left: -90,
    bottom: 180,
  } as const satisfies Record<typeof direction, number>;
</script>

<div
  class="down-arrow"
  style="
  --stroke-width: {strokeWidthPx}px;
  --arrow-height: {arrowHeightPx}px;
  --arrow-tail-size: {arrowTailSizePx}px;
  transform: rotate({rotate[direction]}deg);
  "
>
  <div class="arrow-tail" />
</div>

<style lang="scss">
  .down-arrow {
    position: relative;
    width: 0;
    height: var(--arrow-height);
    border-left: var(--stroke-width) solid;
    transition: height 0.3s ease-in-out;

    .arrow-tail {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: var(--arrow-tail-size);
      height: var(--arrow-tail-size);
      transform-origin: top left;
      border-left: var(--stroke-width) solid;
      border-top: var(--stroke-width) solid;
      transform: //
        translateX(calc(-1 * var(--stroke-width) / 2)) //
        translateY(calc(-1 * var(--stroke-width) / 2)) //
        rotate(45deg);
    }
  }
</style>
