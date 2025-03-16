'use client';
import { authClient } from '../lib/auth-client';

export default function Home() {
	const {
		data: session,
		// isPending, //loading state
		// error, //error object
		// refetch, //refetch the session
	} = authClient.useSession();

	return (
		<div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
				{session?.user ? <p>User name: {session.user.name}</p> : null}
			</main>
		</div>
	);
}

