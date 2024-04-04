<script lang="ts">
  import Icon from "@iconify/svelte";
  import { Select } from "bits-ui";
  import { slide } from "svelte/transition";
  import { getEntries } from "$lib/utils/consts";
  import { atomThemeMode } from "$lib/utils/stores/ui";
  import type { ThemeMode } from "$lib/utils/types/ui";

  const themes = {
    light: { label: "Light", icon: "mdi:white-balance-sunny" },
    dark: { label: "Dark", icon: "mdi:weather-night" },
    system: { label: "System", icon: "mdi:theme-light-dark" },
  } as const satisfies Record<ThemeMode, { label: string; icon: string }>;

  const items = getEntries(themes).map(([value, { label, icon }]) => ({
    value,
    label,
    icon,
  }));
</script>

<Select.Root {items} selected={atomThemeMode}>
  <Select.Trigger title="テーマを選択する">
    <div class="icon">
      <Icon icon={themes[$atomThemeMode].icon} height={23} />
    </div>
  </Select.Trigger>
  <Select.Content
    class="select-content"
    sameWidth={false}
    sideOffset={8}
    transition={slide}
    transitionConfig={{ duration: 300 }}
  >
    {#each items as { label, icon, value }}
      <Select.Item
        class="select-item"
        {value}
        {label}
        on:click={() => {
          $atomThemeMode = value;
        }}
      >
        <Icon {icon} />
        <p>{label}</p>
        <div class="icon">
          <Select.ItemIndicator class="select-item-indicator" asChild={false}>
            <Icon icon="mdi:check" />
          </Select.ItemIndicator>
        </div>
      </Select.Item>
    {/each}
  </Select.Content>
  <Select.Input name="favoriteFruit" />
</Select.Root>

<style lang="scss">
  :global(.select-content) {
    border: 1px solid $color-text;
    padding: 0.5rem;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: $spacing-1;
    z-index: $z-index-dropdown;
  }
  :global(.select-item) {
    display: grid;
    grid-template-columns: auto 1fr 20px;
    gap: $spacing-2;
    align-items: center;
    cursor: pointer;
  }
  :global(.icon) {
    display: grid;
    place-items: center;
  }
</style>
