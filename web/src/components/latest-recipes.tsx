import { client } from '@/sanity/client';
import { SanityDocument } from 'next-sanity';
import Link from 'next/link';
const query = `*[
  _type == "recipe"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };
export default async function LatestRecipes() {
	const recipes = await client.fetch<SanityDocument[]>(query, {}, options);
	return recipes.map((recipe, key) => {
		return (
			<div key={key}>
				<Link href={`/recipes/${recipe.slug.current}`}>
					<p>{recipe.title}</p>
				</Link>
			</div>
		);
	});
}
