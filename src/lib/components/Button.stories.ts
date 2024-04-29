import type { Meta, StoryObj } from "@storybook/svelte";
import Button from "./Button.svelte";

const meta = {
  title: "Main/Parts/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
  },
} satisfies Meta<Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Show more →",
  },
};