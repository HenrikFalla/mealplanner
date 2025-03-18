'use client';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { useState } from 'react';
import type { ISignUpUser } from '@/app/lib/types';
import { authClient } from '@/app/lib/auth-client';
import { redirect } from 'next/navigation';
import { Button } from '../ui/button';
import { EyeClosedIcon, EyeIcon, RefreshCw } from 'lucide-react';

export default function SignUpForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState({
		password: 'password',
		confirmPassword: 'password',
	});
	const [formData, setFormData] = useState<ISignUpUser>({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [errors, setErrors] = useState({
		name: {
			error: false,
			message: '',
		},
		email: {
			error: false,
			message: '',
		},
		password: {
			error: false,
			message: '',
		},
		confirmPassword: {
			error: false,
			message: '',
		},
	});
	const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
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

	const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let errorCount = 0;
		setErrors((prevState) => {
			return {
				...prevState,
				name: {
					error: false,
					message: '',
				},
				email: {
					error: false,
					message: '',
				},
				password: {
					error: false,
					message: '',
				},
				confirmPassword: {
					error: false,
					message: '',
				},
			};
		});
		if (formData.password !== formData.confirmPassword) {
			setErrors((prevState) => {
				return {
					...prevState,
					confirmPassword: {
						error: true,
						message: 'Passwords do not match',
					},
				};
			});
			errorCount = errorCount + 1;
		}
		if (formData.name === '' || formData.name.length <= 2) {
			setErrors((prevState) => {
				return {
					...prevState,
					name: {
						error: true,
						message: 'Name is required',
					},
				};
			});
			errorCount = errorCount + 1;
		}
		if (errorCount > 0) {
			return;
		}
		const { data, error } = await authClient.signUp.email(
			{
				email: formData.email, // user email address
				password: formData.password, // user password -> min 8 characters by default
				name: formData.name, // user display name
				callbackURL: '/sign-in', // a url to redirect to after the user verifies their email (optional)
			},
			{
				onRequest: (ctx) => {
					setIsLoading(true);
					console.log(ctx);
				},
				onSuccess: (ctx) => {
					redirect(ctx.data.redirectUrl);
				},
				onError: (ctx) => {
					setIsLoading(false);
					// display the error message
					setErrors((prevState) => {
						return {
							...prevState,
							email: {
								error: true,
								message: ctx.error.message,
							},
						};
					});
				},
			},
		);
		console.log(data, error);
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
					<CardTitle>Sign up</CardTitle>
					<CardDescription>
						Create a new account to use the Mealplanner.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={handleSignUp}
						className='flex flex-col gap-4'
					>
						<div className='flex flex-col gap-2 justify-start'>
							<label
								htmlFor='name'
								className='pl-2 sr-only'
							>
								Name
							</label>
							<input
								name='name'
								placeholder='Your name here...'
								type='text'
								id='name'
								value={formData.name}
								onChange={(e) => {
									setFormData({
										...formData,
										name: e.target.value,
									});
								}}
								className='p-2 px-4 border border-foreground/50 dark:border-background/50 active:border-foreground/75 active:dark:border-background/75 rounded-lg'
							/>
							{errors.name.error && (
								<p className='text-red-500'>{errors.name.message}</p>
							)}
						</div>
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
							{errors.email.error && (
								<p className='text-red-500'>{errors.email.message}</p>
							)}
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
							{errors.password.error && (
								<p className='text-red-500'>{errors.password.message}</p>
							)}
						</div>
						<div className='flex flex-col gap-2 justify-start relative'>
							<label
								htmlFor='confirmPassword'
								className='pl-2 sr-only'
							>
								Confirm password
							</label>
							<input
								name='confirmPassword'
								placeholder='Confirm your password...'
								type={showPassword.confirmPassword}
								id='confirmPassword'
								value={formData.confirmPassword}
								onChange={(e) => {
									setFormData({
										...formData,
										confirmPassword: e.target.value,
									});
								}}
								className='p-2 px-4 border border-foreground/50 dark:border-background/50 active:border-foreground/75 active:dark:border-background/75 rounded-lg'
							/>
							<Button
								type='button'
								className='absolute right-2 top-2'
								onClick={() => togglePasswordVisibility('confirmPassword')}
							>
								{showPassword.confirmPassword === 'password' ? (
									<EyeClosedIcon />
								) : (
									<EyeIcon />
								)}
							</Button>
							{errors.confirmPassword.error && (
								<p className='text-red-500'>{errors.confirmPassword.message}</p>
							)}
						</div>
						<Button type='submit'>Sign up</Button>
					</form>
				</CardContent>
				<CardFooter>
					<p className='text-foreground/75 dark:text-background/75 text-sm'>
						{'Alreade have an account? '}
						<Link
							href='/sign-in'
							className='text-foreground dark:text-background underline'
						>
							{'Sign in here.'}
						</Link>
					</p>
				</CardFooter>
			</Card>
		</>
	);
}
