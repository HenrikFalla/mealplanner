'use client';
import React, { useEffect, useState } from 'react';
import type { IGenre } from '../lib/types';
import { getGenres } from '../utils/database/genres/actions';
import { RefreshCw } from 'lucide-react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { ValidateDeleteGenre, ValidateNewGenre } from '../utils/validate-data';

export function ManageGenres() {
	const [loaded, setLoaded] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [newGenre, setNewGenre] = useState<string>('');
	const [genres, setGenres] = useState<Array<IGenre>>([]);
	console.log(genres);
	useEffect(() => {
		const fetchGenres = async () => {
			const response = (await getGenres()) as unknown as Array<IGenre>;
			setGenres(response);
		};
		fetchGenres();
		setLoaded(true);
	}, []);
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		const response = (await ValidateNewGenre(newGenre)) as unknown as IGenre;
		setGenres((prevState) => [...prevState, response]);
		setNewGenre('');
		setIsLoading(false);
	};
	const deleteGenre = async (data: IGenre) => {
		setIsLoading(true);
		const response = await ValidateDeleteGenre(data);
		setGenres((prevState) =>
			prevState.filter((genre) => genre.id !== response.id),
		);
		setIsLoading(false);
	};
	return (
		<>
			{isLoading && (
				<div className='absolute top-0 left-0 w-full h-full flex items-center justify-center z-100 bg-background/75 dark:bg-foreground/75'>
					<RefreshCw className='w-10 h-10 motion-safe:animate-spin' />
				</div>
			)}
			<section className='grid-cols-12 grid gap-4 pt-4'>
				<section className='col-span-12 md:col-span-4'>
					<form onSubmit={handleSubmit}>
						<Card>
							<CardHeader>
								<CardTitle>{'Create new genre'}</CardTitle>
								<CardDescription>
									{'Write in the name of the genre you want to create'}
								</CardDescription>
							</CardHeader>
							<CardContent className='flex flex-col gap-4'>
								<input
									type='text'
									name='genre'
									id='genre'
									placeholder='Vegetar, Kjøtt, Hvitt kjøtt, etc...'
									disabled={isLoading}
									value={newGenre}
									onChange={(e) => setNewGenre(e.target.value)}
									className='border border-foreground/25 dark:border-background/25 rounded-lg p-2 px-4'
								/>
								<Button
									type='submit'
									disabled={isLoading}
									className='w-fit mt-4 mx-auto bg-foreground/75 dark:bg-background/75 hover:bg-foreground hover:dark:bg-background p-4 px-8 text-background dark:text-foreground rounded-lg transition-all duration-300 ease-in-out'
								>
									Save genre
								</Button>
							</CardContent>
						</Card>
					</form>
				</section>
				{loaded ? (
					<section className='col-span-12 md:col-span-8 flex flex-row flex-wrap gap-4'>
						{genres.map((genre) => {
							return (
								<Card
									key={genre.id}
									className='h-fit'
								>
									<CardHeader>
										<CardTitle>{genre.name}</CardTitle>
									</CardHeader>
									<CardContent className='flex flex-col gap-4'>
										<Button
											onClick={() => deleteGenre(genre)}
											disabled={isLoading}
											className='w-fit p-2 px-4 border rounded-lg border-foreground/25 hover:border-foreground/75 dark:border-background/25 hover:dark:border-background/75 transition-all ease-in-out duration-300'
										>
											Delete
										</Button>
									</CardContent>
								</Card>
							);
						})}
					</section>
				) : (
					<section className='col-span-12 md:col-span-8 flex flex-row flex-wrap gap-4'>
						<div className='flex flex-col gap-4 p-11 border border-foreground/25 dark:border-background/25 rounded-lg animate-pulse h-fit'>
							<div className='block w-24 h-6 rounded-lg bg-foreground/25 dark:bg-background/25 animate-pulse'></div>
							<div className='block w-18 h-9 rounded-lg bg-foreground/25 dark:bg-background/25 animate-pulse'></div>
						</div>
						<div className='flex flex-col gap-4 p-11 border border-foreground/25 dark:border-background/25 rounded-lg animate-pulse h-fit'>
							<div className='block w-24 h-6 rounded-lg bg-foreground/25 dark:bg-background/25 animate-pulse'></div>
							<div className='block w-18 h-9 rounded-lg bg-foreground/25 dark:bg-background/25 animate-pulse'></div>
						</div>
						<div className='flex flex-col gap-4 p-11 border border-foreground/25 dark:border-background/25 rounded-lg animate-pulse h-fit'>
							<div className='block w-24 h-6 rounded-lg bg-foreground/25 dark:bg-background/25 animate-pulse'></div>
							<div className='block w-18 h-9 rounded-lg bg-foreground/25 dark:bg-background/25 animate-pulse'></div>
						</div>
						<div className='flex flex-col gap-4 p-11 border border-foreground/25 dark:border-background/25 rounded-lg animate-pulse h-fit'>
							<div className='block w-24 h-6 rounded-lg bg-foreground/25 dark:bg-background/25 animate-pulse'></div>
							<div className='block w-18 h-9 rounded-lg bg-foreground/25 dark:bg-background/25 animate-pulse'></div>
						</div>
						<div className='flex flex-col gap-4 p-11 border border-foreground/25 dark:border-background/25 rounded-lg animate-pulse h-fit'>
							<div className='block w-24 h-6 rounded-lg bg-foreground/25 dark:bg-background/25 animate-pulse'></div>
							<div className='block w-18 h-9 rounded-lg bg-foreground/25 dark:bg-background/25 animate-pulse'></div>
						</div>
					</section>
				)}
			</section>
		</>
	);
}
