import { createUnits, deleteUnit } from '../api/database/units/route';
import { IUnit } from './types';

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
