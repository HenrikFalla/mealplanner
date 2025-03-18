import '@/app/globals.css';
import { Header } from '@/components/header';

export default function PagesLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Header />
			<main className='min-h-screen pt-20'>{children}</main>
			<footer className='row-start-3 flex gap-[24px] flex-wrap items-center justify-center pb-8'>
				{`Copyright © ${new Date().getFullYear()} Henrik Falla`}
			</footer>
		</>
	);
}

