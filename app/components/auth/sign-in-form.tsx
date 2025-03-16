'use client';
import { useState } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card';
import Link from 'next/link';
import { Button } from '../ui/button';
import { EyeClosedIcon, EyeIcon, RefreshCw } from 'lucide-react';
import { authClient } from '@/app/lib/auth-client';

export default function SignInForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [showPassword, setShowPassword] = useState({
		password: 'password',
	});
	const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		const { data, error } = await authClient.signIn.email(
			{
				email: formData.email,
				password: formData.password,
				callbackURL: '/',
				rememberMe: true,
			},
			{},
		);
		console.log(data, error);
		setIsLoading(false);
	};
	const togglePasswordVisibility = (field: 'password') => {
		if (showPassword[field] === 'password') {
			setShowPassword((prevState) => {
				return {
					...prevState,
					[field]: 'text',
				};
			});
		} else {
			setShowPassword((prevState) => {
				return {
					...prevState,
					[field]: 'password',
				};
			});
		}
	};

	return (
		<>
			{isLoading && (
				<div className='absolute top-0 left-0 w-full h-full flex items-center justify-center z-100 bg-background/75 dark:bg-foreground/75'>
					<RefreshCw className='w-10 h-10 motion-safe:animate-spin' />
				</div>
			)}

			<Card>
				<CardHeader>
					<CardTitle>{'Sign in'}</CardTitle>
					<CardDescription>{'Sign in to your account'}</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={handleSignIn}
						className='flex flex-col gap-4'
					>
						<div className='flex flex-col gap-2 justify-start'>
							<label
								htmlFor='email'
								className='pl-2 sr-only'
							>
								E-mail
							</label>
							<input
								name='email'
								placeholder='Your email here...'
								type='email'
								id='email'
								value={formData.email}
								onChange={(e) => {
									setFormData({
										...formData,
										email: e.target.value,
									});
								}}
								className='p-2 px-4 border border-foreground/50 dark:border-background/50 active:border-foreground/75 active:dark:border-background/75 rounded-lg'
							/>
						</div>
						<div className='flex flex-col gap-2 justify-start relative'>
							<label
								htmlFor='password'
								className='pl-2 sr-only'
							>
								Password
							</label>
							<input
								name='password'
								placeholder='Your password here...'
								type={showPassword.password}
								id='password'
								value={formData.password}
								onChange={(e) => {
									setFormData({
										...formData,
										password: e.target.value,
									});
								}}
								className='p-2 px-4 border border-foreground/50 dark:border-background/50 active:border-foreground/75 active:dark:border-background/75 rounded-lg'
							/>
							<Button
								type='button'
								className='absolute right-2 top-2'
								tabIndex={-1}
								onClick={() => togglePasswordVisibility('password')}
							>
								{showPassword.password === 'password' ? (
									<EyeClosedIcon />
								) : (
									<EyeIcon />
								)}
							</Button>
						</div>
						<Button type='submit'>Sign in</Button>
					</form>
				</CardContent>
				<CardFooter>
					<p className='text-foreground/75 dark:text-background/75 text-sm'>
						{"Don't have an account? "}
						<Link
							href='/sign-up'
							className='text-foreground dark:text-background underline'
						>
							{'Sign up here.'}
						</Link>
					</p>
				</CardFooter>
			</Card>
		</>
	);
}
