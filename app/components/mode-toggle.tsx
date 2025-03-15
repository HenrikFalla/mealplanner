import { useTheme } from 'next-themes';
import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';

export function ModeToggle() {
	const { setTheme } = useTheme();

	return (
		<div>
			<Button type='button'>
				<Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
				<Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
				<span className='sr-only'>Toggle theme</span>
			</Button>
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
		</div>
	);
}
