import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import RecipeSteps from './recipe-steps';

const meta = {
	component: RecipeSteps,
} satisfies Meta<typeof RecipeSteps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		instructions: [
			{
				children: [
					{
						text: 'Sett ovnen til 230 grader celcius. Sett en jernpanne med høye kanter inn i ovnen slik at den varmer seg opp med ovnen. ',
					},
				],
			},
			{
				children: [
					{
						text: 'Pisk sammen mel og melk til du har en klumpfri blanding. Bland inn egg og salt, pisk sammen til du har en luftig blanding. Du vil ha mange små luftbobler i røren. Du kan bruke en stavmikser for å blande inn luft om du foretrekker.',
					},
				],
			},
			{
				children: [
					{
						text: 'Riv parmesanen og hakk opp persillen. Du kan også bruke tørket persille. Bland sammen.',
					},
				],
			},
		],
	},
};
