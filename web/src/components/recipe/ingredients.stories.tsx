import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Ingredients from './ingredients';

const meta = {
	component: Ingredients,
} satisfies Meta<typeof Ingredients>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		ingredients: [
			{
				name: 'Egg, rått',
				quantity: 2,
				measurement: 'stykk',
			},
			{
				name: 'Mel',
				quantity: 150,
				measurement: 'gram',
			},
			{
				name: 'Melk',
				quantity: 90,
				measurement: 'gram',
			},
		],
	},
};
