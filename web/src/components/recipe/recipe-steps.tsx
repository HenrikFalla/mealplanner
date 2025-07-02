export default function RecipeSteps(
	instructions: { children: { text: string }[] }[],
) {
	console.log(instructions);
	return <div>Recipe steps</div>;
}
