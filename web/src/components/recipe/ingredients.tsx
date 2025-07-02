'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function Ingredients({
	ingredients,
	defaultportions = 1,
	minPortions = 1,
}: {
	ingredients: {
		ingredient: {
			name: string;
		};
		measurement: {
			name: string;
		};
		quantity: number;
	}[];
	defaultportions?: number;
	minPortions?: number;
}) {
	const [portions, setPortions] = useState(defaultportions);
	return (
		<Card>
			<CardHeader>
				<CardTitle className='font-bold text-2xl'>Ingredienser</CardTitle>
				<label className='pt-4'>
					Antall porsjoner
					<div className='flex gap-2 items-center pt-2'>
						<Button
							variant='outline'
							disabled={portions <= minPortions}
							onClick={() => setPortions((prevState) => prevState - 1)}
						>
							-
						</Button>
						<Input
							type='number'
							min='1'
							value={portions}
							onChange={(e) => setPortions(Number(e.target.value))}
							className='w-fit max-w-16'
						/>
						<Button
							variant='outline'
							onClick={() => setPortions((prevState) => prevState + 1)}
						>
							+
						</Button>
					</div>
				</label>
			</CardHeader>
			<Separator />
			<CardContent>
				<ul className='list-disc list-inside'>
					{ingredients.map((item, key) => (
						<li key={key}>
							{item.quantity && (item.quantity / defaultportions) * portions}{' '}
							{item.measurement.name && item.measurement.name}{' '}
							{item.ingredient.name && item.ingredient.name.toLowerCase()}
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	);
}
