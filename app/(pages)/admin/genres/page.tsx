import { ManageGenres } from '@/components/manage-genres';
import { auth } from '@/app/lib/auth';
import { ArrowLeft } from 'lucide-react';
import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function AdminGenres() {
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
		<section className='flex flex-col gap-8'>
			<Link
				href='/admin'
				className='flex flex-row gap-2 items-start w-fit'
			>
				<ArrowLeft />
				Admin
			</Link>
			<h1>Manage Genres</h1>
			<ManageGenres />
		</section>
	);
}
