'use client';
import { useState } from 'react';
import { IUnit } from '../app/lib/types';
import { Button } from './ui/button';
import {
	ValidateDeleteUnit,
	ValidateNewUnits,
} from '../app/utils/validate-data';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function ManageUnits({ data }: { data: Array<IUnit> }) {
	const [units, setUnits] = useState<Array<IUnit>>(data);
	const [newUnits, setNewUnits] = useState<Array<IUnit>>([]);
	const addNewUnit = async () => {
		setNewUnits((prevState) => {
			const newState = [...prevState];
			newState.push({
				name: '',
			});
			return newState;
		});
	};
	const saveUnits = async () => {
		const response = await ValidateNewUnits(newUnits);
		const res = response as unknown as Array<IUnit>;
		const updatedNewUnits = Array.from(
			res.map((unit) => ({ name: unit.name, id: unit.id })),
		);
		setNewUnits([]);
		setUnits((prevState) => [...prevState, ...updatedNewUnits]);
	};
	const deleteUnit = async (data: IUnit) => {
		const response = await ValidateDeleteUnit(data);
		setUnits((prevState) => prevState.filter((u) => u.id !== response.id));
	};
	const removeUnit = (data: IUnit) => {
		setNewUnits((prevState) => {
			const newState = [...prevState];
			newState.splice(newState.indexOf(data), 1);
			return newState;
		});
	};
	return (
		<section className='flex flex-col gap-4'>
			<section className='flex flex-col gap-4'>
				<div className='flex flex-row gap-4'>
					<Button
						type='button'
						onClick={addNewUnit}
						className='p-2 px-4 text-background dark:text-foreground rounded-md bg-foreground/75 dark:bg-background/75 hover:bg-foreground hover:dark:bg-background transition-all ease-in-out duration-300'
					>
						Add new unit
					</Button>
					{newUnits.length > 0 && (
						<Button
							type='button'
							onClick={saveUnits}
							className='p-2 px-4 border rounded-md border-foreground/25 dark:border-background/25 hover:border-foreground/75 hover:dark:border-background/75 transition-all ease-in-out duration-300'
						>
							Save new units
						</Button>
					)}
				</div>
				{newUnits.length > 0 && (
					<div className='flex flex-row flex-wrap gap-4'>
						{newUnits.map((unit, key) => {
							return (
								<div key={key}>
									<Card>
										<CardHeader>
											<CardTitle>
												<label>{'New unit'}</label>
											</CardTitle>
										</CardHeader>
										<CardContent className='flex flex-col gap-4'>
											<input
												type='text'
												placeholder='Unit name'
												value={unit.name}
												onChange={(e) => {
													setNewUnits((prevState) => {
														const newState = [...prevState];
														newState[newState.indexOf(unit)].name =
															e.target.value;
														return newState;
													});
												}}
												className='border rounded-lg border-foreground/25 dark:border-background/25 p-2'
											/>
											<div>
												<Button
													type='button'
													onClick={() => removeUnit(unit)}
													className='p-2 px-4 border rounded-md border-foreground/25 dark:border-background/25 hover:border-foreground/75 hover:dark:border-background/75 transition-all ease-in-out duration-300'
												>
													{'Remove'}
												</Button>
											</div>
										</CardContent>
									</Card>
								</div>
							);
						})}
					</div>
				)}
			</section>
			<section>
				{units.length > 0 ? (
					<div className='flex flex-row flex-wrap gap-4'>
						{units.map((unit, key) => {
							return (
								<div key={key}>
									<Card>
										<CardHeader>
											<CardTitle>
												{!unit.id ? (
													<label>{'New unit'}</label>
												) : (
													<label>{'Unit: ' + unit.name}</label>
												)}
											</CardTitle>
										</CardHeader>
										<CardContent className='flex flex-col gap-4'>
											<input
												type='text'
												placeholder='Unit name'
												value={unit.name}
												onChange={(e) => {
													setUnits((prevState) => {
														const newState = [...prevState];
														newState[newState.indexOf(unit)].name =
															e.target.value;
														return newState;
													});
												}}
												className='border rounded-lg border-foreground/25 dark:border-background/25 p-2'
											/>
											<div>
												<Button
													type='button'
													onClick={() => deleteUnit(unit)}
													className='p-2 px-4 border rounded-md border-foreground/25 dark:border-background/25 hover:border-foreground/75 hover:dark:border-background/75 transition-all ease-in-out duration-300'
												>
													{'Delete'}
												</Button>
											</div>
										</CardContent>
									</Card>
								</div>
							);
						})}
					</div>
				) : (
					<span>No units found</span>
				)}
			</section>
		</section>
	);
}
