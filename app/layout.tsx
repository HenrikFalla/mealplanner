import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './components/theme-provider';
import { Header } from './components/header';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Meal Planner',
	description: 'Plan for an easier life',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='en'
			suppressHydrationWarning
		>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem={true}
					disableTransitionOnChange
				>
					<Header />
					<main className='min-h-screen pt-20'>{children}</main>
					<footer className='row-start-3 flex gap-[24px] flex-wrap items-center justify-center pb-8'>
						{`Copyright © ${new Date().getFullYear()} Henrik Falla`}
					</footer>
				</ThemeProvider>
			</body>
		</html>
	);
}

