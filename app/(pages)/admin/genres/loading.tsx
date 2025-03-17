export default function Loading() {
	return (
		<section className='flex flex-col gap-8'>
			<div className='h-6 w-20 block bg-foreground/25 dark:bg-background/25 rounded-xl animate-pulse'></div>
			<div className='h-10 w-56 block bg-foreground/25 dark:bg-background/25 rounded-xl animate-pulse'></div>
			<section className='grid-cols-12 grid gap-4 pt-4'>
				<section className='col-span-12 md:col-span-4'>
					<div className='p-12 block w-full border-foreground/25 dark:border-background/25 rounded-lg border animate-pulse h-80'>
						<div className='block w-46 h-6 rounded-lg bg-foreground/25 dark:bg-background/25 animate-pulse'></div>
						<div className='flex flex-col gap-1 mt-2'>
							<div className='block w-full h-4 rounded-lg bg-foreground/25 dark:bg-background/25 animate-pulse'></div>
							<div className='block w-10 h-4 rounded-lg bg-foreground/25 dark:bg-background/25 animate-pulse'></div>
						</div>
					</div>
				</section>
			</section>
		</section>
	);
}
