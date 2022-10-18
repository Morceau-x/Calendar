import { UserModel } from '../../models/UserModel';

export type AuthApi = {
	signIn: (username: string, password: string) => Promise<UserModel>;
	register: (email: string, username: string, password: string) => Promise<UserModel>;
	signOut: () => Promise<void>;
};
