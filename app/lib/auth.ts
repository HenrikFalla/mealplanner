import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@prisma/client';
import { customSession } from 'better-auth/plugins';

const prisma = new PrismaClient();
export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: 'postgresql', // or "mysql", "postgresql", ...etc
	}),
	emailAndPassword: {
		enabled: true,
	},
	socialProviders: {
		github: {
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		},
	},
	plugins: [
		customSession(async ({ user, session }) => {
			const role = await prisma.user.findUnique({
				where: {
					email: user.email,
				},
				select: {
					role: true,
				},
			});
			return {
				user: {
					...user,
					role: role?.role,
				},
				session,
			};
		}),
	],
});
