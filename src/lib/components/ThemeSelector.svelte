<script lang="ts">
  import Icon from "@iconify/svelte";
  import { Select } from "bits-ui";
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

<Select.Root
  type="single"
  value={$atomThemeMode}
  onValueChange={(value) => {
    $atomThemeMode = value as ThemeMode;
  }}
>
  <Select.Trigger title="テーマを選択する">
    <div class="icon">
      <Icon icon={themes[$atomThemeMode].icon} height={23} />
    </div>
  </Select.Trigger>
  <Select.Portal>
    <Select.Content class="select-content" sideOffset={8}>
      <Select.Viewport>
        {#each items as { label, icon, value }}
          <Select.Item class="select-item" {value} {label}>
            {#snippet children({ selected })}
              <Icon {icon} />
              <p>{label}</p>
              <div class="icon">
                {#if selected}
                  <Icon icon="mdi:check" />
                {/if}
              </div>
            {/snippet}
          </Select.Item>
        {/each}
      </Select.Viewport>
    </Select.Content>
  </Select.Portal>
</Select.Root>

<style lang="scss">
  :global(.select-content) {
    background-color: $color-bg;
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
