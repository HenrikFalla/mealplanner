import { createGenre, deleteGenre } from '../api/database/genres/route';
import { createIngredient } from '../api/database/ingredients/route';
import { createUnits, deleteUnit } from '../api/database/units/route';
import { IGenre, IUnit } from '../lib/types';

export async function ValidateNewUnits(units: Array<IUnit>) {
	console.log('Units to validate', units);
	const response = await createUnits(units);
	return response;
}
export async function ValidateDeleteUnit(data: IUnit) {
	console.log('Unit to delete', data);
	const response = await deleteUnit(data);
	console.log('Response delete unit: ', response);
	return response;
}
export async function ValidateNewIngredient(data: {
	name: string;
	genre: number;
}) {
	console.log('Ingredient to create', data);
	const newIngredient = {
		name: data.name,
		ingredientGenreId: data.genre,
	};
	const response = await createIngredient(newIngredient);
	return response;
}
export async function ValidateNewGenre(data: string) {
	console.log('Genre to create', data);
	const newGenre = {
		name: data,
	} as IGenre;
	const response = await createGenre(newGenre);
	return response;
}
export async function ValidateDeleteGenre(data: IGenre) {
	console.log('Genre to delete', data);
	const response = await deleteGenre(data);
	return response;
}
