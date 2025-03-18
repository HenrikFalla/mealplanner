import { headers } from 'next/headers';
import { auth } from '../../lib/auth';
import { redirect } from 'next/navigation';
import { Card, CardHeader, CardTitle } from '../../../components/ui/card';
import Link from 'next/link';
import { CarrotIcon, HandPlatterIcon, PencilRulerIcon } from 'lucide-react';

export default async function Admin() {
	const response = await auth.api.getSession({
		headers: await headers(),
	});
	if (!response) {
		redirect('/sign-in');
	}
	if (response.user.role !== 'ADMIN') {
		redirect('/');
	}
	return (
		<section className='p-8 pt-0 flex flex-col gap-4 min-h-screen'>
			<section>
				<h1>Admin</h1>
				<span>{`Welcome ${response.user.name}`}</span>
			</section>
			<section className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 grid-rows-12'>
				<Link
					href='/admin/units'
					className='col-span-2 row-span-1 flex flex-col justify-center items-center h-full w-full'
				>
					<Card className='h-full w-full'>
						<CardHeader className='h-full flex flex-col items-center justify-center w-full'>
							<CardTitle className='flex flex-row items-start gap-4'>
								<PencilRulerIcon className='w-10 h-10' />
								Manage units
							</CardTitle>
						</CardHeader>
					</Card>
				</Link>
				<Link
					href='/admin/ingredients'
					className='col-span-2 row-span-1 flex flex-col justify-center items-center h-full w-full'
				>
					<Card className='h-full w-full'>
						<CardHeader className='h-full flex flex-col items-center justify-center w-full'>
							<CardTitle className='flex flex-row items-start gap-4 h-full'>
								<CarrotIcon className='w-14 h-14 -mt-2' />
								Manage ingredients
							</CardTitle>
						</CardHeader>
					</Card>
				</Link>
				<Link
					href='/admin/genres'
					className='col-span-2 row-span-1 flex flex-col justify-center items-center h-full w-full'
				>
					<Card className='h-full w-full'>
						<CardHeader className='h-full flex flex-col items-center justify-center w-full'>
							<CardTitle className='flex flex-row items-start gap-4 h-full'>
								<HandPlatterIcon className='w-12 h-12' />
								Manage genres
							</CardTitle>
						</CardHeader>
					</Card>
				</Link>
			</section>
		</section>
	);
}
