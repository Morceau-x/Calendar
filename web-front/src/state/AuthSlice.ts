import { call, cancel, fork, ForkEffect, put, take } from 'redux-saga/effects';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import { Task } from 'redux-saga';
import { UserModel } from '../models/UserModel';
import { AuthRepository } from '../io/auth/AuthRepository';
import { AuthModel, LoggedInState, LoggedOut, LoginErrorState, RegisterErrorState } from '../models/AuthModel';

//////////////////////////////////////////////////////////////////////
/////////////////////////////// SLICE ////////////////////////////////
//////////////////////////////////////////////////////////////////////

const initialState: AuthModel = LoggedOut;

const name = 'authentication';

type LoginPayload = {
	id: string;
	username: string;
};

const slice = createSlice({
	name: name,
	initialState,
	reducers: {
		login: (state: AuthModel, action: PayloadAction<LoginPayload>) => LoggedInState(action.payload.id, action.payload.username),
		logout: (state: AuthModel) => LoggedOut,
		loginError: (state: AuthModel, action: PayloadAction<string>) => LoginErrorState(action.payload),
		registerError: (state: AuthModel, action: PayloadAction<string>) => RegisterErrorState(action.payload),
	},
});

//////////////////////////////////////////////////////////////////////
/////////////////////////////// SAGAS ////////////////////////////////
//////////////////////////////////////////////////////////////////////

type LoginRequestPayload = {
	username: string;
	password: string;
};

type RegisterRequestPayload = {
	email: string;
	username: string;
	password: string;
};

const actions = {
	...slice.actions,
	loginRequest: createAction<LoginRequestPayload>(`${name}/loginRequest`),
	registerRequest: createAction<RegisterRequestPayload>(`${name}/registerRequest`),
	logoutRequest: createAction(`${name}/logoutRequest`),
	loginRequestError: createAction<string>(`${name}/loginError`),
	registerRequestError: createAction<string>(`${name}/registerError`),
};

const authRepository = new AuthRepository();

function* attemptLogin(loginAction: PayloadAction<LoginRequestPayload>) {
	const p = loginAction.payload;
	try {
		const userModel: UserModel = yield call(authRepository.signIn, p.username, p.password);
		yield put(actions.login(userModel));
	} catch (e) {
		if (typeof e == 'string') yield put(actions.loginRequestError(e));
	}
}

function* attemptRegister(registerAction: PayloadAction<RegisterRequestPayload>) {
	const p = registerAction.payload;
	try {
		const userModel: UserModel = yield call(authRepository.register, p.email, p.username, p.password);
		yield put(actions.login(userModel));
	} catch (e) {
		if (typeof e == 'string') yield put(actions.loginRequestError(e));
	}
}

const sagas: ForkEffect[] = [
	fork(function* () {
		while (true) {
			let action: AnyAction = yield take([actions.loginRequest.type, actions.registerRequest.type]);
			const tasks: Task[] = [];
			if (action.type == actions.loginRequest.type) {
				tasks.push(
					yield fork(function* () {
						yield attemptLogin(action as PayloadAction<LoginRequestPayload>);
					})
				);
			}
			if (action.type == actions.registerRequest.type) {
				tasks.push(
					yield fork(function* () {
						yield attemptRegister(action as PayloadAction<RegisterRequestPayload>);
					})
				);
			}
			action = yield take([actions.loginRequestError.type, actions.registerRequestError.type, actions.logoutRequest.type]);
			tasks.forEach(function* (task) {
				yield cancel(task);
			});
			if (action.type == actions.loginRequestError.type) {
				const errorAction = action as PayloadAction<string>;
				yield put(actions.loginError(errorAction.payload));
			} else if (action.type == actions.registerRequestError.type) {
				const errorAction = action as PayloadAction<string>;
				yield put(actions.registerError(errorAction.payload));
			} else if (action.type == actions.logoutRequest.type) {
				yield put(actions.logout);
			}
		}
	}),
];

//////////////////////////////////////////////////////////////////////
////////////////////////////// EXPORT ////////////////////////////////
//////////////////////////////////////////////////////////////////////

const authSlice = {
	slice: slice,
	sagas: sagas,
	actions: {
		registerRequest: actions.registerRequest,
		loginRequest: actions.loginRequest,
		logoutRequest: actions.logoutRequest,
	},
};

export default authSlice;
