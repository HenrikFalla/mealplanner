import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import RecipeIntro from './recipe-intro';

const meta = {
	component: RecipeIntro,
} satisfies Meta<typeof RecipeIntro>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		props: {
			imageUrl:
				'https://cdn.sanity.io/images/52mbskz3/production/cd50177881cfe05e02d50daf3159c0d9e37c736f-1707x2560.jpg?rect=0,799,1707,962&w=550&h=310',
			title: 'Savory Dutch Baby',
			description:
				'Denne retten er en salt og savoury rett som egner seg meget godt til frokost på en lat søndagsmorgen. Retten kan også omtales som en "broken sufflé" og gir en luftig rett med god smak av ost og urter.',
		},
	},
};
export const NoImage: Story = {
	args: {
		props: {
			title: 'Savory Dutch Baby',
			description:
				'Denne retten er en salt og savoury rett som egner seg meget godt til frokost på en lat søndagsmorgen. Retten kan også omtales som en "broken sufflé" og gir en luftig rett med god smak av ost og urter.',
		},
	},
};
