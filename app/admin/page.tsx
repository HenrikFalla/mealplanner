import { headers } from 'next/headers';
import { auth } from '../lib/auth';
import { redirect } from 'next/navigation';

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
	return <></>;
}
