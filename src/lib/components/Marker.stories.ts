import type { Meta, StoryObj } from "@storybook/svelte";
import Marker from "./Marker.svelte";

const meta = {
  title: "Main/Parts/Marker",
  component: Marker,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
  },
} satisfies Meta<Marker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "about",
  },
};