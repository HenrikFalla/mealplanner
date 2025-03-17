export interface ISignUpUser {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}
export interface IUser {
	id: string;
	email: string;
	image?: string;
	name?: string;
	role?: string;
}
export interface IUserSession {
	user: {
		id: string;
		email: string;
		image?: string;
		name?: string;
		role?: string;
	};
}
export interface IUnit {
	id?: number;
	name: string;
}
export interface IIngredient {
	id?: number;
	name: string;
	IngredientGenre?: {
		id: number;
		name: string;
	};
	ingredientGenreId?: number;
}
export interface IIngredientGenre {
	id: number;
	name: string;
}
