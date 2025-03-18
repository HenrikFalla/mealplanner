'use client'; // this registers <Editor> as a Client Component
import type { Block } from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';

// Our <Editor> component we can reuse later
export default function Editor({
	onChange,
}: {
	onChange: (data: string) => void;
}) {
	// Creates a new editor instance.
	const editor = useCreateBlockNote({
		domAttributes: {
			editor: {
				class: 'blocknote-editor',
			},
		},
	});
	const handleChange = async ({ data }: { data: Block[] }) => {
		const newData = JSON.stringify(data);
		onChange(newData);
	};
	// Renders the editor instance using a React component.
	return (
		<>
			<BlockNoteView
				editor={editor}
				onChange={() => handleChange({ data: editor.document })}
			/>
		</>
	);
}
