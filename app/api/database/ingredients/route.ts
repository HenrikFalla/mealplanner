'use server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GetIngredients() {
	const response = await prisma.ingredient.findMany({
		select: {
			id: true,
			name: true,
			IngredientGenre: true,
			ingredientGenreId: true,
		},
	});
	return response;
}
export async function GetIngredientGenres() {
	const response = await prisma.ingredientGenre.findMany({
		select: {
			id: true,
			name: true,
		},
	});
	return response;
}
export async function CreateIngredient(data: {
	name: string;
	ingredientGenreId: number;
}) {
	const response = await prisma.ingredient.create({
		data,
		include: {
			IngredientGenre: true,
		},
	});
	return response;
}
