import { getUnits } from '@/app/api/database/units/route';
import { ManageUnits } from '@/app/components/manage-units';
import { auth } from '@/app/lib/auth';
import type { IUnit } from '@/app/utils/types';
import { ArrowLeft } from 'lucide-react';
import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Units() {
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
		<section className='flex flex-col gap-8 p-8 pt-0'>
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
