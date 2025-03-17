'use server';
import { IGenre } from '@/app/lib/types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GetGenres() {
	const response = await prisma.genre.findMany();
	return response;
}
export async function CreateGenre(data: IGenre) {
	const response = await prisma.genre.create({
		data,
	});
	return response;
}
export async function DeleteGenre(data: IGenre) {
	const response = await prisma.genre.delete({
		where: {
			id: data.id,
		},
	});
	return response;
}
