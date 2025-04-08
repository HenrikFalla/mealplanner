'use client';
import { IGenre } from '@/app/lib/types';
import { useEffect, useState, useReducer } from 'react';
import { Editor } from './DynamicEditor';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from './ui/card';
import { getGenres } from '@/app/utils/database/genres/actions';
function recipeReducer(state: object, action: object) {
	switch (action.type) {
		case 'UPDATE_TITLE':
			return { ...state, title: action.payload };
		case 'UPDATE_GENRE':
			console.log(action.type, action.payload);
			return { ...state, genre: action.payload };
		case 'UPDATE_DESCRIPTION':
			return { ...state, description: action.payload };
		default:
			return state;
	}
}
export function RecipeForm() {
	const [state, dispatch] = useReducer(recipeReducer, {
		title: '',
		description: '',
		image: '',
		steps: [],
		ingredients: [],
		genre: {
			id: 0,
			name: '',
		} as IGenre,
	});
	console.log('state', state);
	const [genres, setGenres] = useState<IGenre[]>([]);
	useEffect(() => {
		const fetchGenres = async () => {
			const response = await getGenres();
			setGenres(response);
		};
		fetchGenres();
	}, []);
	const handleDescriptionChange = (data: string) => {
		dispatch({ type: 'UPDATE_DESCRIPTION', payload: data });
	};
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
									value={state.title}
									onChange={(e) =>
										dispatch({ type: 'UPDATE_TITLE', payload: e.target.value })
									}
								/>
							</div>
							<div className='flex flex-col gap-2 w-fit'>
								<label htmlFor='genre'>Genre</label>
								<select
									name='genre'
									id='genre'
									value={state.genre.id}
									className='bg-background dark:bg-foreground p-2.5 px-4 border rounded-lg border-foreground/25 dark:border-background/25'
									onChange={(e) =>
										dispatch({
											type: 'UPDATE_GENRE',
											payload: genres.find(
												(genre) => genre.id === parseInt(e.target.value),
											),
										})
									}
								>
									<option
										value={0}
										disabled
									>
										Select genre
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
						<div className='flex flex-col gap-2'>
							<label
								htmlFor=''
								className='pl-2'
							>
								Description
							</label>
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
