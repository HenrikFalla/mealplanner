import { createAuthClient } from 'better-auth/react';
export const authClient = createAuthClient({
	baseURL: process.env.BETTER_AUTH_URL as string, // the base url of your auth server
});
// export const { signIn, signUp, useSession } = createAuthClient();
// const signIn = async () => {
// 	const dataGoogle = await authClient.signIn.social({
// 		provider: 'google',
// 	})
// 	const dataGithub = await authClient.signIn.social({
// 		provider: 'github',
// 	})
// 	console.log(dataGoogle)
// 	console.log(dataGithub)
// };
