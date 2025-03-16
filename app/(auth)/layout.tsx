import type { Metadata } from 'next';

import '@/app/globals.css';

export const metadata: Metadata = {
	title: 'Sign in/Sign up for Mealplanner',
	description: 'Mealplan for a simpler life',
};

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className='h-screen flex flex-col items-center justify-center'>
			{children}
		</div>
	);
}
