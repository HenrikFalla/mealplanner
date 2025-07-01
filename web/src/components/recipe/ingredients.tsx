'use client';
import { useState } from 'react';
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from '../ui/card';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function Ingredients({
	ingredients,
	defaultportions = 1,
	minPortions = 1,
}: {
	ingredients: {
		name: string;
		quantity: number;
		measurement: string;
	}[];
	defaultportions?: number;
	minPortions?: number;
}) {
	const [portions, setPortions] = useState(defaultportions);
	return (
		<Card>
			<CardHeader>
				<CardTitle>Ingredienser</CardTitle>
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
							{item.quantity * portions} {item.measurement}{' '}
							{item.name.toLowerCase()}
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	);
}
