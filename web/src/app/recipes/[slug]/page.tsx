import { type SanityDocument } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from '@/sanity/client';
import RecipeIntro from '@/components/recipe/recipe-intro';
import Ingredients from '@/components/recipe/ingredients';
import RecipeSteps from '@/components/recipe/recipe-steps';

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
	const ingredients = [...post.ingredients];
	console.log('Ingredients: ', ingredients); // Remove this
	const postImageUrl =
		post.image ? urlFor(post.image)?.width(550).height(310).url() : null;
	console.log('postImageUrl', postImageUrl); // Remove this
	return (
		<main className='grid grid-cols-12 gap-4 relative'>
			<section className='col-span-12'>
				{postImageUrl ?
					<RecipeIntro
						props={{
							imageUrl: postImageUrl,
							title: post.title,
							description: post.description,
						}}
					/>
				:	<RecipeIntro
						props={{
							title: post.title,
							description: post.description,
						}}
					/>
				}
			</section>
			<div className='grid grid-cols-12 gap-4 col-span-12 max-w-6xl mx-auto'>
				<aside className='px-4 col-span-12 md:col-span-4 relative md:sticky top-0 h-fit'>
					<Ingredients
						ingredients={post.ingredients}
						defaultportions={post.portions}
						minPortions={post.minPortions}
					/>
				</aside>
				<section className='px-4 col-span-12 md:col-span-8'>
					<RecipeSteps instructions={post.instructions} />
				</section>
			</div>
		</main>
	);
}
