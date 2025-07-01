'use client';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import Image from 'next/image';
import { useState } from 'react';

export default function RecipeIntro({
	props: { imageUrl, title, description },
}: {
	props: { imageUrl: string; title: string; description: string };
}) {
	const [portions, setPortions] = useState(1);
	return (
		<section className='flex items-center justify-center flex-col'>
			<AspectRatio ratio={16 / 9}>
				<Image
					src={imageUrl}
					alt={title}
					width={500}
					height={330}
					priority
					className='object-cover w-full h-auto rounded-2xl'
				/>
			</AspectRatio>
		</section>
	);
}
