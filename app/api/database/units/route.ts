'use server';
import { IUnit } from '@/app/utils/types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUnits() {
	const units = await prisma.units.findMany({
		select: {
			id: true,
			name: true,
		},
	});
	return units;
}
export async function createUnits(units: Array<IUnit>) {
	const data = await prisma.units.createManyAndReturn({
		data: units,
		skipDuplicates: true,
	});
	return data;
}
export async function deleteUnit(unit: IUnit) {
	const data = await prisma.units.delete({
		where: {
			id: unit.id,
		},
	});
	return data;
}
