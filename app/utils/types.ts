export interface ISignUpUser {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}
export interface IUserSession {
	user: {
		id: string;
		email: string;
		image?: string;
		name?: string;
	};
}
