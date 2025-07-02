export default function RecipeSteps(props: {
	instructions: {
		children: {
			text: string;
		}[];
	}[];
}) {
	console.log(props.instructions);
	return <div>Recipe steps</div>;
}
