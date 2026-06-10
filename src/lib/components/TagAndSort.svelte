<script lang="ts">
  import Icon from "@iconify/svelte";
  import { ToggleGroup } from "bits-ui";
  import { slide } from "svelte/transition";
  import Tag from "./Tag.svelte";
  import { getEntries } from "$lib/utils/consts";
  import { tags } from "$lib/utils/types/blogs";

  let {
    sortAsAsc = $bindable(false),
    selectedTags = $bindable(Object.values(tags).map((v) => v.title)),
  }: {
    sortAsAsc?: boolean;
    selectedTags?: string[];
  } = $props();

  let isOpen = $state(false);

  const items = getEntries(tags).map(([value, { title, icon }]) => ({
    value,
    label: title,
    icon,
  }));
</script>

<div class="sort">
  <button
    class="taged"
    onclick={() => {
      isOpen = !isOpen;
    }}>tag</button
  >
  {#if isOpen}
    <div class="select" transition:slide={{ duration: 200 }}>
      <div>
        <button
          onclick={() => {
            const fullySelected = selectedTags.length === items.length;
            selectedTags = fullySelected ? [] : items.map(({ label }) => label);
          }}
        >
          <Icon icon="mdi:tag-multiple" />
          All/None
        </button>
      </div>
      <ToggleGroup.Root bind:value={selectedTags} type="multiple">
        {#each items as { label, icon }}
          <ToggleGroup.Item aria-label="toggle bold" value={label}
            ><div>
              {#if selectedTags.includes(label)}
                <Icon icon="mdi:check" />
              {:else}
                <Icon icon="mdi:checkbox-blank-outline" />
              {/if}
              <Icon {icon} />
              <p>{label}</p>
            </div>
          </ToggleGroup.Item>
        {/each}
      </ToggleGroup.Root>
    </div>
  {/if}
  <Tag
    onclick={() => {
      sortAsAsc = !sortAsAsc;
    }}>公開日</Tag
  >
</div>

<style lang="scss">
  .sort {
    margin: 0 $spacing-8;
    margin-top: $spacing-20;
    margin-bottom: $spacing-8;
    display: grid;
    grid-template-columns: 150px 150px 1fr;
    gap: $spacing-8;
    position: relative;

    @include mobile {
      grid-template-columns: 1fr;
    }

    button {
      border: 1px solid $color-text;
      border-radius: 5px;
      background-color: $color-bg;
      color: $color-text;
      cursor: pointer;
      text-align: center;
    }

    .select {
      position: absolute;
      top: 50px;
      left: 0;
      width: 200px;
      background-color: $color-bg;
      border: 1px solid $color-text;
      border-radius: 5px;
      padding: $spacing-5;
      z-index: $z-index-dropdown;
      display: grid;

      div {
        display: grid;
        grid-template-columns: 20px 20px 1fr;
        height: 30px;
        gap: $spacing-1;
        align-items: center;

        button {
          display: grid;
          grid-template-columns: 20px 1fr;
          gap: $spacing-2;
          align-items: center;
          border: 1px solid $color-bg;
          border-radius: 5px;
          background-color: $color-bg;
          color: $color-text;
          cursor: pointer;
        }
      }
    }

  }
</style>
