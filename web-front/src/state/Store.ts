import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { Action, AnyAction, Dispatch } from 'redux';
import authSlice from './AuthSlice';
import displaySlice from './DisplaySlice';

const reducers = {
	auth: authSlice.slice.reducer,
	display: displaySlice.slice.reducer,
};

const watchers = [...authSlice.sagas];

const sagas = function* root(): Generator {
	yield all([...watchers]);
};

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
	reducer: { ...reducers },
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});
sagaMiddleware.run(sagas);

export type State = ReturnType<typeof store.getState>;
export const useAppSelector = <TSelected = unknown>(
	selector: (state: State) => TSelected,
	equalityFn?: (left: TSelected, right: TSelected) => boolean
): TSelected => useSelector<State, TSelected>(selector, equalityFn);
export const useAppDispatch = <A extends Action = AnyAction>(): Dispatch<A> => useDispatch<typeof store.dispatch>();

export default store;
