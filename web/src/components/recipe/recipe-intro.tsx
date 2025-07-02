'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function RecipeIntro({
	props: { imageUrl, title, description },
}: {
	props: { imageUrl?: string; title: string; description: string };
}) {
	return (
		<section className='flex items-center justify-center flex-col pb-4'>
			{imageUrl && (
				<div className='w-full h-fit max-h-80 overflow-hidden'>
					<Image
						src={imageUrl}
						alt={title}
						width={500}
						height={330}
						priority
						className='object-cover w-auto h-auto min-h-full min-w-full '
					/>
				</div>
			)}
			<div className='mx-4 md:mx-auto md:max-w-4xl flex flex-col gap-4 pt-4'>
				<h1 className='text-5xl font-bold'>{title}</h1>
				<p>{description}</p>
			</div>
		</section>
	);
}
