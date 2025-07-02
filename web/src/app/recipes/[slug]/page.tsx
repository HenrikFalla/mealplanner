import { type SanityDocument } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from '@/sanity/client';
import Image from 'next/image';
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import RecipeIntro from '@/components/recipe/recipe-intro';
import Ingredients from '@/components/recipe/ingredients';

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
	const ingredients = [...post.ingredients];
	console.log('Ingredients: ', ingredients); // Remove this
	const postImageUrl =
		post.image ? urlFor(post.image)?.width(550).height(310).url() : null;
	console.log('postImageUrl', postImageUrl); // Remove this
	return (
		<main>
			<section>
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
			<aside className='px-4'>
				<Ingredients
					ingredients={post.ingredients}
					defaultportions={post.portions}
					minPortions={post.minPortions}
				/>
			</aside>
		</main>
	);
}
