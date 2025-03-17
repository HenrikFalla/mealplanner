'use server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getIngredients() {
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
export async function getIngredientGenres() {
	const response = await prisma.ingredientGenre.findMany({
		select: {
			id: true,
			name: true,
		},
	});
	return response;
}
export async function createIngredient(data: {
	name: string;
	ingredientGenreId: number;
}) {
	const response = await prisma.ingredient.create({
		data,
	});
	return response;
}
