import {
	getIngredientGenres,
	getIngredients,
} from '@/app/api/database/ingredients/route';
import { ManageIngredients } from '@/app/components/manage-ingredients';
import { auth } from '@/app/lib/auth';
import { IIngredient, IIngredientGenre } from '@/app/utils/types';
import { ArrowLeft } from 'lucide-react';
import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Units() {
	const response = await auth.api.getSession({
		headers: await headers(),
	});
	if (!response) {
		redirect('/sign-in');
	}
	if (response.user.role !== 'ADMIN') {
		redirect('/');
	}
	// const { user } = response;
	const ingredients = (await getIngredients()) as unknown as IIngredient[];
	const ingredientGenres =
		(await getIngredientGenres()) as unknown as IIngredientGenre[];
	console.log(ingredients);
	console.log(ingredientGenres);
	return (
		<section className='flex flex-col gap-8 p-8 pt-0'>
			<Link
				href='/admin'
				className='flex flex-row gap-2 items-start w-fit'
			>
				<ArrowLeft />
				Admin
			</Link>
			<h1 className='text-4xl font-bold'>Manage Ingredientes</h1>
			<ManageIngredients
				ingredientData={ingredients}
				ingredientGenre={ingredientGenres}
			/>
		</section>
	);
}
