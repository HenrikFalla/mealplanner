'use client';
import { useEffect, useState } from 'react';
import { Editor } from './DynamicEditor';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from './ui/card';
import { getGenres } from '@/app/utils/database/genres/actions';
import { IGenre } from '@/app/lib/types';

export function RecipeForm() {
	const [genres, setGenres] = useState<IGenre[]>([{}]);
	const [recipe, setRecipe] = useState({
		title: '',
		genre: 0,
		description: '',
	});
	const [description, setDescription] = useState('');
	console.log(description);
	const handleDescriptionChange = (data: string) => {
		setDescription(data);
	};
	useEffect(() => {
		const fetchGenres = async () => {
			const response = await getGenres();
			setGenres(response);
		};
		fetchGenres();
	}, []);
	return (
		<section className='grid grid-cols-12 gap-4'>
			<section className='col-span-8'>
				<Card>
					<CardHeader>
						<CardTitle>{'New Recipe'}</CardTitle>
						<CardDescription className='text-foreground/75 dark:text-background/75'>
							{"Let's make a new recipe"}
						</CardDescription>
					</CardHeader>
					<CardContent className='flex flex-col gap-4'>
						<div className='flex flex-row gap-4 flex-wrap'>
							<div className='flex flex-col gap-2 w-fit'>
								<label className='pl-2'>Title</label>
								<input
									type='text'
									placeholder='Recipe Title'
									className='p-2 px-4 border rounded-lg border-foreground/25 dark:border-background/25'
								/>
							</div>
							<div className='flex flex-col gap-2 w-fit'>
								<label className='pl-2'>Genre</label>
								<select
									value={recipe.genre}
									className='bg-background dark:bg-foreground p-2.5 px-4 border rounded-lg border-foreground/25 dark:border-background/25'
									onChange={(e) => {
										setRecipe((prevState) => ({
											...prevState,
											genre: parseInt(e.target.value),
										}));
									}}
								>
									<option
										value={0}
										disabled
									>
										Select Genre
									</option>
									{genres.map((genre, key) => (
										<option
											key={key}
											value={genre.id}
										>
											{genre.name}
										</option>
									))}
								</select>
							</div>
						</div>
						<div className='flex flex-col gap-2 '>
							<label className='pl-2'>Description</label>
							<span className='text-sm text-foreground/75 dark:text-background/75 pl-2'>
								{'Write a short description for your recipe.'}
							</span>
							<div className='w-full border rounded-lg border-foreground/25 dark:border-background/25'>
								<Editor onChange={handleDescriptionChange} />
							</div>
						</div>
					</CardContent>
				</Card>
			</section>
		</section>
	);
}
