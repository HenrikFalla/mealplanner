'use client';

import { ForkKnife } from 'lucide-react';
import { authClient } from '../lib/auth-client';
import { ModeToggle } from './mode-toggle';
import Link from 'next/link';
import ProfileMenu from './profile-menu';
import { IUser } from '../lib/types';

export function Header() {
	const {
		data: session,
		isPending, //loading state
		// error, //error object
		// refetch, //refetch the session
	} = authClient.useSession();
	console.log('Pending: ', isPending);
	console.log('Session: ', session);
	return (
		<section className='flex flex-row justify-between items-center p-4 fixed top-0 w-screen px-8 bg-background/95 dark:bg-foreground/95 border-b border-foreground/25 dark:border-background/25 backdrop-blur-sm supports-[backdrop-filter]:bg-background/35 dark:supports-[backdrop-filter]:bg-foreground/35'>
			<div>
				<Link
					href='/'
					className='flex flex-row gap-2 text-4xl font-semibold'
				>
					<ForkKnife className='h-10 w-10' />
					Meal Planner
				</Link>
			</div>
			<div className='flex flex-row gap-4 items-center'>
				<ModeToggle />
				<div>
					{session === null ? (
						<Link
							href='/sign-in'
							className='p-2 px-4 border rounded-lg border-foreground/25 dark:border-background/25 hover:border-foreground/75 hover:dark:border-background/75 transition-all ease-in-out duration-300'
						>
							Sign In
						</Link>
					) : (
						<div>
							<ProfileMenu user={session.user as IUser} />
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
