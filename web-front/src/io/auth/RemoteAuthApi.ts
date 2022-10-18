import { AuthApi } from './AuthApi';
import { UserModel } from '../../models/UserModel';

export default class RemoteAuthApi implements AuthApi {
	register = async (email: string, username: string, password: string): Promise<UserModel> => {
		// TODO implem auth
		throw new Error('Register feature not implemented');
	};

	signIn = async (username: string, password: string): Promise<UserModel> => {
		// TODO implem auth
		return {
			id: 'fakeUser',
			username: 'Fake User',
		};
	};

	signOut = async (): Promise<void> => {
		// TODO implem auth
		return;
	};
}
