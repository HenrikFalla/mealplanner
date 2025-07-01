import { type SanityDocument } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from '@/sanity/client';
import Image from 'next/image';

const RECIPE_QUERY = `*[_type == "recipe" && slug.current == $slug][0]{
  ...,
  ingredients[]{
    ...,
    ingredient->,
    measurement->
  }
}`;
const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
	projectId && dataset ?
		imageUrlBuilder({ projectId, dataset }).image(source)
	:	null;
const options = { next: { revalidate: 30 } };
interface Ingredient {
	ingredient: { name: string };
	measurement: { name: string };
	quantity: number;
}
export default async function Recipe({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const post = await client.fetch<SanityDocument>(
		RECIPE_QUERY,
		await params,
		options,
	);
	console.log('Recipe', post); // Remove this
	const postImageUrl =
		post.image ? urlFor(post.image)?.width(550).height(310).url() : null;
	return (
		<main>
			{postImageUrl && (
				<Image
					src={postImageUrl}
					alt={post.title}
					width={500}
					height={500}
					priority
				/>
			)}
			<h1 className='text-4xl font-bold mb-8'>{post.title}</h1>
			<p>{post.description}</p>
			{post.ingredients?.length > 0 && (
				<div className='mt-8'>
					<h2 className='text-2xl font-bold mb-4'>Ingredienser</h2>
					<ul className='list-disc list-inside'>
						{post.ingredients.map((item: Ingredient, key: number) => (
							<li key={key}>
								{item.quantity}
								{item.measurement && ` ${item.measurement.name}`}
								{item.ingredient && ` ${item.ingredient.name}`}
							</li>
						))}
					</ul>
				</div>
			)}
		</main>
	);
}
