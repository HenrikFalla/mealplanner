import { CreateGenre, DeleteGenre } from '../api/database/genres/route';
import { CreateIngredient } from '../api/database/ingredients/route';
import { CreateUnits, DeleteUnit } from '../api/database/units/route';
import { IGenre, IUnit } from '../lib/types';

export async function ValidateNewUnits(units: Array<IUnit>) {
	console.log('Units to validate', units);
	const response = await CreateUnits(units);
	return response;
}
export async function ValidateDeleteUnit(data: IUnit) {
	console.log('Unit to delete', data);
	const response = await DeleteUnit(data);
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
	const response = await CreateIngredient(newIngredient);
	return response;
}
export async function ValidateNewGenre(data: string) {
	console.log('Genre to create', data);
	const newGenre = {
		name: data,
	} as IGenre;
	const response = await CreateGenre(newGenre);
	return response;
}
export async function ValidateDeleteGenre(data: IGenre) {
	console.log('Genre to delete', data);
	const response = await DeleteGenre(data);
	return response;
}
