export default function RecipeSteps(props: {
	instructions: {
		children: {
			text: string;
		}[];
	}[];
}) {
	console.log(props.instructions);
	const { instructions } = props;
	return (
		<section className='flex flex-col gap-8'>
			<div>
				<h2>Intruksjoner</h2>
			</div>
			<div className='flex flex-col gap-8'>
				{instructions.map((instruction, key) => (
					<div
						key={key}
						className='flex flex-col gap-2'
					>
						<span className='font-bold italic'>{`Steg ${key + 1}:`}</span>
						{instruction.children.map((child, key) => (
							<p key={key}>{child.text}</p>
						))}
					</div>
				))}
			</div>
		</section>
	);
}
