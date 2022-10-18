import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store, { useAppDispatch } from './state/Store';
import { ThemeProvider } from 'react-jss';
import { defaultTheme } from './models/ThemeModel';
import { Router } from './utils/Routes';
import { useAppTranslation } from './utils/intl/I18nOptions';
import displaySlice from './state/DisplaySlice';

const App: React.VoidFunctionComponent = () => {
	const language = useAppTranslation();
	const dispatch = useAppDispatch();

	useEffect(() => {
		window.addEventListener('resize', () => {
			dispatch(displaySlice.actions.resize({ width: window.innerWidth, height: window.innerHeight }));
		});
	}, []);

	return language.ready ? <Router /> : <>Loading</>;
};

ReactDOM.render(
	<Provider store={store}>
		<ThemeProvider theme={defaultTheme}>
			<App />
		</ThemeProvider>
	</Provider>,
	document.getElementById('app')
);
