export function Button(props: {
	children: React.ReactNode;
	className?: string;
	type: 'button' | 'submit' | 'reset';
	onClick?: () => void;
}) {
	return (
		<button
			type={props.type}
			className={'card ' + props.className}
			onClick={props.onClick && props.onClick}
		>
			{props.children}
		</button>
	);
}
