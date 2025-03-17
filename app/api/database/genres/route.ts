'use server';
import { IGenre } from '@/app/lib/types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getGenres() {
	const response = await prisma.genre.findMany();
	return response;
}
export async function createGenre(data: IGenre) {
	const response = await prisma.genre.create({
		data,
	});
	return response;
}
export async function deleteGenre(data: IGenre) {
	const response = await prisma.genre.delete({
		where: {
			id: data.id,
		},
	});
	return response;
}
