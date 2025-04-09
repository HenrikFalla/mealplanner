'use client';
import { IGenre, IIngredient } from '@/app/lib/types';
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
import { getIngredients } from '@/app/utils/database/ingredients/actions';
const enum ActionType {
	UPDATE_TITLE = 'UPDATE_TITLE',
	UPDATE_GENRE = 'UPDATE_GENRE',
	UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION',
	ADD_INGREDIENT = 'ADD_INGREDIENT',
	REMOVE_INGREDIENT = 'REMOVE_INGREDIENT',
}
interface RecipeState {
	title: string;
	description: string;
	image: string;
	steps: string[];
	ingredients: { name: string; amount: number; unit: string }[];
	genre: IGenre;
}
interface UpdateTitleAction {
	type: ActionType.UPDATE_TITLE;
	payload: string; // Payload is a string
}

interface UpdateGenreAction {
	type: ActionType.UPDATE_GENRE;
	payload: IGenre; // Payload is an IGenre object
}

interface UpdateDescriptionAction {
	type: ActionType.UPDATE_DESCRIPTION;
	payload: string; // Payload is a string
}

interface AddIngredientAction {
	type: ActionType.ADD_INGREDIENT;
	payload: string; // Payload is the ingredient name (string)
}

interface RemoveIngredientAction {
	type: ActionType.REMOVE_INGREDIENT;
	payload: string; // Payload is the ingredient name (string)
}
type RecipeAction =
	| UpdateTitleAction
	| UpdateGenreAction
	| UpdateDescriptionAction
	| AddIngredientAction
	| RemoveIngredientAction;

const initialState: RecipeState = {
	title: '',
	description: '',
	image: '',
	steps: [],
	ingredients: [], // Start with an empty array is often cleaner
	genre: {
		id: 0, // Or a sensible default ID if applicable
		name: '',
	},
};

function recipeReducer(state: RecipeState, action: RecipeAction) {
	switch (action.type) {
		case ActionType.UPDATE_TITLE:
			return { ...state, title: action.payload };
		case ActionType.UPDATE_GENRE:
			console.log(action.type, action.payload);
			return { ...state, genre: action.payload };
		case ActionType.UPDATE_DESCRIPTION:
			return { ...state, description: action.payload };
		case ActionType.ADD_INGREDIENT:
			return {
				...state,
				ingredients: [
					...state.ingredients,
					{ name: action.payload, amount: 0, unit: '' },
				],
			};
		case ActionType.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: state.ingredients.filter(
					(ingredient: { name: string }) => ingredient.name !== action.payload,
				),
			};
		default:
			return state;
	}
}
export function RecipeForm() {
	const [state, dispatch] = useReducer(recipeReducer, initialState);
	console.log('state', state);
	const [genres, setGenres] = useState<IGenre[]>([]);
	const [ingredients, setIngredients] = useState<IIngredient[]>([]);
	const [search, setSearch] = useState<string>('');
	console.log('ingredients', ingredients);
	useEffect(() => {
		const fetchGenres = async () => {
			const response = await getGenres();
			setGenres(response);
		};
		const fetchIngredients = async () => {
			const response = await getIngredients();
			setIngredients(response as IIngredient[]);
		};
		fetchGenres();
		fetchIngredients();
	}, []);
	const handleDescriptionChange = (data: string) => {
		dispatch({ type: ActionType.UPDATE_DESCRIPTION, payload: data });
	};
	const handleIngredientChange = (data: string, checked: boolean) => {
		if (checked) {
			dispatch({ type: ActionType.ADD_INGREDIENT, payload: data });
		} else {
			dispatch({ type: ActionType.REMOVE_INGREDIENT, payload: data });
		}
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
										dispatch({
											type: ActionType.UPDATE_TITLE,
											payload: e.target.value,
										})
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
											type: ActionType.UPDATE_GENRE,
											payload: genres.find(
												(genre) => genre.id === parseInt(e.target.value),
											) as IGenre,
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
						<div className='flex flex-col gap-2'>
							<input
								type='text'
								placeholder='Søk etter ingredienser'
								name='ingredient-search'
								id='ingredient-search'
								className='p-2 px-4 border rounded-lg border-foreground/25 dark:border-background/25'
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
							<div className='flex flex-row gap-2'>
								{ingredients.map((ingredient, key) => {
									if (
										search === '' ||
										ingredient.name.toLowerCase().includes(search.toLowerCase())
									) {
										return (
											<label
												key={key}
												htmlFor={ingredient.name}
											>
												<input
													type='checkbox'
													id={ingredient.name}
													name={ingredient.name}
													value={ingredient.name}
													key={key}
													onChange={(e) => {
														//console.log(e.target.value, e.target.checked);
														handleIngredientChange(
															e.target.value,
															e.target.checked,
														);
													}}
												/>
												{ingredient.name}
											</label>
										);
									}
								})}
							</div>
						</div>
					</CardContent>
				</Card>
			</section>
		</section>
	);
}
