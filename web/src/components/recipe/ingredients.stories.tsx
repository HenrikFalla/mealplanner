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
				ingredient: {
					name: 'Egg',
				},
				quantity: 2,
				measurement: {
					name: 'stykk',
				},
			},
			{
				ingredient: { name: 'Mel' },
				quantity: 150,
				measurement: { name: 'gram' },
			},
			{
				ingredient: { name: 'Melk' },
				quantity: 90,
				measurement: { name: 'gram' },
			},
		],
	},
};
