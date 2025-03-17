import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/app/components/ui/card';

export default function Loading() {
	return (
		<section className='flex flex-col gap-8'>
			<div className='h-6 w-20 block bg-foreground/25 dark:bg-background/25 rounded-xl animate-pulse'></div>
			<div className='h-10 w-56 block bg-foreground/25 dark:bg-background/25 rounded-xl animate-pulse'></div>
			<section className='flex flex-col gap-4'>
				<section className='flex flex-col gap-4'>
					<div className='flex flex-row gap-4'>
						<div className='h-9 w-28 block bg-foreground/25 dark:bg-background/25 rounded-xl animate-pulse'></div>
					</div>
					<div className='flex flex-row flex-wrap gap-4'>
						<Card className='h-56 w-[293px] block border border-foreground/25 dark:border-background/25 rounded-xl animate-pulse'>
							<CardHeader>
								<CardTitle className='w-20 h-7 block bg-foreground/25 dark:bg-background/25 rounded-xl animate-pulse'></CardTitle>
							</CardHeader>
							<CardContent className='flex flex-col gap-4'>
								<div className='w-[212px] h-[42px] block bg-foreground/25 dark:bg-background/25 rounded-xl animate-pulse'></div>
								<div className='w-[74px] h-[38px] block bg-foreground/25 dark:bg-background/25 rounded-xl animate-pulse'></div>
							</CardContent>
						</Card>
						<Card className='h-56 w-[293px] block border border-foreground/25 dark:border-background/25 rounded-xl animate-pulse'>
							<CardHeader>
								<CardTitle className='w-20 h-7 block bg-foreground/25 dark:bg-background/25 rounded-xl animate-pulse'></CardTitle>
							</CardHeader>
							<CardContent className='flex flex-col gap-4'>
								<div className='w-[212px] h-[42px] block bg-foreground/25 dark:bg-background/25 rounded-xl animate-pulse'></div>
								<div className='w-[74px] h-[38px] block bg-foreground/25 dark:bg-background/25 rounded-xl animate-pulse'></div>
							</CardContent>
						</Card>
						<Card className='h-56 w-[293px] block border border-foreground/25 dark:border-background/25 rounded-xl animate-pulse'>
							<CardHeader>
								<CardTitle className='w-20 h-7 block bg-foreground/25 dark:bg-background/25 rounded-xl animate-pulse'></CardTitle>
							</CardHeader>
							<CardContent className='flex flex-col gap-4'>
								<div className='w-[212px] h-[42px] block bg-foreground/25 dark:bg-background/25 rounded-xl animate-pulse'></div>
								<div className='w-[74px] h-[38px] block bg-foreground/25 dark:bg-background/25 rounded-xl animate-pulse'></div>
							</CardContent>
						</Card>
						<Card className='h-56 w-[293px] block border border-foreground/25 dark:border-background/25 rounded-xl animate-pulse'>
							<CardHeader>
								<CardTitle className='w-20 h-7 block bg-foreground/25 dark:bg-background/25 rounded-xl animate-pulse'></CardTitle>
							</CardHeader>
							<CardContent className='flex flex-col gap-4'>
								<div className='w-[212px] h-[42px] block bg-foreground/25 dark:bg-background/25 rounded-xl animate-pulse'></div>
								<div className='w-[74px] h-[38px] block bg-foreground/25 dark:bg-background/25 rounded-xl animate-pulse'></div>
							</CardContent>
						</Card>
						<Card className='h-56 w-[293px] block border border-foreground/25 dark:border-background/25 rounded-xl animate-pulse'>
							<CardHeader>
								<CardTitle className='w-20 h-7 block bg-foreground/25 dark:bg-background/25 rounded-xl animate-pulse'></CardTitle>
							</CardHeader>
							<CardContent className='flex flex-col gap-4'>
								<div className='w-[212px] h-[42px] block bg-foreground/25 dark:bg-background/25 rounded-xl animate-pulse'></div>
								<div className='w-[74px] h-[38px] block bg-foreground/25 dark:bg-background/25 rounded-xl animate-pulse'></div>
							</CardContent>
						</Card>
					</div>
				</section>
			</section>
		</section>
	);
}
