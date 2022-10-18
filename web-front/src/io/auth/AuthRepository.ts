import RemoteAuthApi from './RemoteAuthApi';
import { AuthApi } from './AuthApi';
import { UserModel } from '../../models/UserModel';

export class AuthRepository implements AuthApi {
	private remote: RemoteAuthApi;

	constructor() {
		this.remote = new RemoteAuthApi();
	}

	register(email: string, username: string, password: string): Promise<UserModel> {
		return this.remote.register(email, username, password);
	}

	signIn(username: string, password: string): Promise<UserModel> {
		return this.remote.signIn(username, password);
	}

	signOut(): Promise<void> {
		return this.remote.signOut();
	}
}
