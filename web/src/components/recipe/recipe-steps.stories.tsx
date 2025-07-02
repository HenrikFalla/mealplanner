import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import RecipeSteps from './recipe-steps';

const meta = {
  component: RecipeSteps,
} satisfies Meta<typeof RecipeSteps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};