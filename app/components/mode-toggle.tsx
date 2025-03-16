'use client';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from './ui/card';

export function ModeToggle() {
	const { setTheme } = useTheme();
	const [open, setOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
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
			className='relative'
			ref={menuRef}
		>
			<Button
				type='button'
				onClick={() => setOpen((prevState) => !prevState)}
				className='p-2 border rounded-lg border-foreground/25 dark:border-background/25 hover:border-foreground/75 dark:hover:border-background/75 transition-all ease-in-out duration-300'
			>
				<Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
				<Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
				<span className='sr-only'>Toggle theme</span>
			</Button>
			<Card
				className={`${
					open ? 'flex' : 'hidden'
				} absolute top-12 right-0 flex-col gap-2 p-4 justify-center items-center`}
				id='dark-mode-menu'
			>
				<CardContent className='flex flex-col gap-2 items-start p-0'>
					<Button
						type='button'
						onClick={() => setTheme('light')}
					>
						Light
					</Button>
					<Button
						type='button'
						onClick={() => setTheme('dark')}
					>
						Dark
					</Button>
					<Button
						type='button'
						onClick={() => setTheme('system')}
					>
						System
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
