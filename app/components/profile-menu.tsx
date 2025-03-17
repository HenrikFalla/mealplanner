'use client';
import { useRouter } from 'next/navigation';
import { authClient } from '../lib/auth-client';
import { Button } from './ui/button';
import { LogOutIcon, UserCircle2Icon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import type { IUser } from '../lib/types';
import Link from 'next/link';

export default function ProfileMenu({ user }: { user: IUser }) {
	const [open, setOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const handleSignOut = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push('/');
				},
			},
		});
	};
	useEffect(() => {
		const menuCloser = (e: Event) => {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener('mousedown', menuCloser);
		return () => {
			document.removeEventListener('mousedown', menuCloser);
		};
	});
	return (
		<div
			ref={menuRef}
			className='relative'
		>
			<Button
				onClick={() => setOpen((prevState) => !prevState)}
				className='p-2 border rounded-lg border-foreground/25 dark:border-background/25 hover:border-foreground/75 dark:hover:border-background/75 transition-all ease-in-out duration-300'
			>
				<UserCircle2Icon className='h-[1.2rem] w-[1.2rem]' />
			</Button>
			<Card
				className={`${
					open ? 'visible opacity-100' : 'invisible opacity-0'
				} transition-all min-w-36 ease-in-out duration-300 absolute flex top-12 right-0 flex-col gap-2 p-4 justify-center items-center`}
				id='profile-menu'
			>
				<CardHeader className='p-0 pb-4 border-b-1 border-foreground/25 dark:border-background/25'>
					<CardTitle className='text-lg'>
						{user.name ? user.name : user.email}
					</CardTitle>
				</CardHeader>
				<CardContent className='p-0 pt-2 pl-2 w-full justify-start items-start flex flex-col gap-4'>
					{user.role === 'ADMIN' && <Link href='/admin'>Admin</Link>}
					<Button
						onClick={handleSignOut}
						className='flex flex-row gap-2'
					>
						<LogOutIcon /> {'Sign out'}
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
