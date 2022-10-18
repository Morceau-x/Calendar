//////////////////////////////////////////////////////////////////////
/////////////////////////////// TYPE /////////////////////////////////
//////////////////////////////////////////////////////////////////////

export const enum AuthTypes {
	loggedOut = 'LoggedOut',
	loggedIn = 'LoggedIn',
	loginErrorState = 'LoginErrorState',
	registerErrorState = 'RegisterErrorState',
}

export const LoggedOut = {
	type: AuthTypes.loggedOut,
};

export type LoggedOutType = typeof LoggedOut;

export const LoggedInState = (id: string, username: string) => ({
	type: AuthTypes.loggedIn,
	id: id,
	username: username,
});
export const LoginErrorState = (message: string) => ({
	type: AuthTypes.loginErrorState,
	message: message,
});

export const RegisterErrorState = (message: string) => ({
	type: AuthTypes.registerErrorState,
	message: message,
});

export type AuthModel = LoggedOutType | ReturnType<typeof LoggedInState> | ReturnType<typeof LoginErrorState> | ReturnType<typeof RegisterErrorState>;

//////////////////////////////////////////////////////////////////////
////////////////////////////// HELPERS ///////////////////////////////
//////////////////////////////////////////////////////////////////////

export const isAuthenticated = (model: AuthModel): boolean => model.type == AuthTypes.loggedIn;
