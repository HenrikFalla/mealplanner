import { headers } from 'next/headers';
import { auth } from '../lib/auth';
import { redirect } from 'next/navigation';
import { Card, CardHeader, CardTitle } from '../components/ui/card';
import Link from 'next/link';
import { PencilRulerIcon } from 'lucide-react';

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
			<section className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4'>
				<Link
					href='/admin/units'
					className='col-span-2'
				>
					<Card>
						<CardHeader>
							<CardTitle className='flex flex-row items-start gap-4'>
								<PencilRulerIcon />
								Manage units
							</CardTitle>
						</CardHeader>
					</Card>
				</Link>
			</section>
		</section>
	);
}
