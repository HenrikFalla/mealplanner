import { getUnits } from '@/app/utils/database/units/actions';
import { ManageUnits } from '@/components/manage-units';
import { auth } from '@/app/lib/auth';
import type { IUnit } from '@/app/lib/types';
import { ArrowLeft } from 'lucide-react';
import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function AdminUnits() {
	const response = await auth.api.getSession({
		headers: await headers(),
	});
	if (!response) {
		redirect('/sign-in');
	}
	if (response.user.role !== 'ADMIN') {
		redirect('/');
	}
	// const { user } = response;
	const units = (await getUnits()) as Array<IUnit>;
	console.log(units);
	return (
		<section className='flex flex-col gap-8'>
			<Link
				href='/admin'
				className='flex flex-row gap-2 items-start w-fit'
			>
				<ArrowLeft />
				Admin
			</Link>
			<h1 className='text-4xl font-bold'>Manage Units</h1>
			<ManageUnits data={units} />
		</section>
	);
}
