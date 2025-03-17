'use client';

import { useState } from 'react';
import type { IIngredient, IIngredientGenre } from '../lib/types';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { ValidateNewIngredient } from '../utils/validate-data';
import { RefreshCw } from 'lucide-react';

export function ManageIngredients(props: {
	ingredientData: IIngredient[];
	ingredientGenre: IIngredientGenre[];
}) {
	const [isLoading, setIsLoading] = useState(false);
	const [ingredients, setIngredients] = useState(props.ingredientData);
	const [newIngredient, setNewIngredient] = useState({
		name: '',
		genre: 0,
	});
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		const response = (await ValidateNewIngredient(
			newIngredient,
		)) as unknown as IIngredient;
		console.log(response);
		setNewIngredient({
			name: '',
			genre: 0,
		});
		setIngredients((prevState) => {
			return [...prevState, response];
		});
		setIsLoading(false);
	};

	return (
		<>
			{isLoading && (
				<div className='absolute top-0 left-0 w-full h-full flex items-center justify-center z-100 bg-background/75 dark:bg-foreground/75'>
					<RefreshCw className='w-10 h-10 motion-safe:animate-spin' />
				</div>
			)}
			<section className='grid-cols-12 grid gap-4'>
				<section className='col-span-12 md:col-span-4'>
					<form onSubmit={handleSubmit}>
						<Card>
							<CardHeader>
								<CardTitle>{'Create new ingredient'}</CardTitle>
								<CardDescription>
									{
										'Write the name of your ingredient and select the appropriate category.'
									}
								</CardDescription>
							</CardHeader>
							<CardContent className='flex flex-col gap-4'>
								<input
									type='text'
									name='name'
									id='name'
									placeholder='Gulerot, eple, kanel, etc...'
									value={newIngredient.name}
									disabled={isLoading}
									onChange={(e) => {
										setNewIngredient((prevState) => {
											return { ...prevState, name: e.target.value };
										});
									}}
									className='border border-foreground/25 dark:border-background/25 rounded-lg p-2 px-4'
								/>
								<select
									name='genre'
									value={newIngredient.genre}
									disabled={isLoading}
									onChange={(e) => {
										setNewIngredient((prevState) => {
											return { ...prevState, genre: parseInt(e.target.value) };
										});
									}}
									className='border border-foreground/25 dark:border-background/25 rounded-lg p-2 px-4 dark:bg-foreground'
								>
									<option
										disabled
										value={0}
									>
										{'Select genre'}
									</option>
									{props.ingredientGenre.map((genre, key) => {
										return (
											<option
												key={key}
												value={genre.id}
											>
												{genre.name}
											</option>
										);
									})}
								</select>
								<Button
									type='submit'
									disabled={isLoading}
									className='w-fit mt-4 mx-auto bg-foreground/75 dark:bg-background/75 hover:bg-foreground hover:dark:bg-background p-4 px-8 text-background dark:text-foreground rounded-lg transition-all duration-300 ease-in-out'
								>
									Save ingredient
								</Button>
							</CardContent>
						</Card>
					</form>
				</section>
				<section className='col-span-12 md:col-span-8 flex flex-col gap-4'>
					{props.ingredientGenre.map((genre, key) => {
						return (
							<div key={key}>
								<Card>
									<CardHeader>
										<CardTitle>{genre.name}</CardTitle>
									</CardHeader>
									<CardContent className='flex flex-row flex-wrap gap-4'>
										{ingredients.map((ingredient, key) => {
											console.log('Ingredient: ', ingredient);
											console.log('Genre: ', genre);
											if (ingredient.ingredientGenreId == genre.id) {
												return (
													<div
														key={key}
														className='relative w-fit flex flex-row gap-2 items-center cursor-pointer min-h-10'
													>
														<input
															type='checkbox'
															name={genre.name}
															id={ingredient.id?.toString()}
															className='hidden checked:[&~label]:pr-20 checked:[&~label]:after:opacity-0 checked:[&~button]:opacity-100 checked:[&~button]:z-20 checked:[&~button]:translate-x-0 checked:[&~button]:visible'
														/>
														<label
															htmlFor={ingredient.id?.toString()}
															className='relative transition-all ease-in-out duration-300 pr-6 cursor-pointer after:cursor-pointer after:content-["\00d7"] opacity-100 after:text-xl after:absolute after:top-0 after:right-0 after:w-4 after:h-4 z-0 after:z-10 after:transition-all after:duration-300 after:ease-in-out] after:self-center after:font-medium'
														>
															{ingredient.name}
														</label>
														<Button
															type='button'
															className='p-2 px-4 border-foreground/25 dark:border-background/25 hover:border-foreground/75 hover:dark:border-background/75 border rounded-lg transition-all duration-300 ease-in-out absolute opacity-0 -z-10 transform right-0 invisible'
														>
															Delete
														</Button>
													</div>
												);
											}
										})}
									</CardContent>
								</Card>
							</div>
						);
					})}
				</section>
			</section>
		</>
	);
}
