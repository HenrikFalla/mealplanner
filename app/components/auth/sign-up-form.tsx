'use client';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/app/components/ui/card';
import Link from 'next/link';
import { useState } from 'react';
import type { ISignUpUser } from '@/app/utils/types';

export default function SignUpForm() {
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

	return (
		<Card>
			<CardHeader>
				<CardTitle>Sign up</CardTitle>
				<CardDescription>
					Create a new account to use the Mealplanner.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form action=''>
					<div className='flex flex-col gap-2 justify-start'>
						<label
							htmlFor='name'
							className='pl-2'
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
				</form>
			</CardContent>
			<CardFooter>
				<p>
					Alreade have an account?{' '}
					<Link
						href='/sign-in'
						className='text-blue-500 underline'
					>
						Sign in here.
					</Link>
				</p>
			</CardFooter>
		</Card>
	);
}
