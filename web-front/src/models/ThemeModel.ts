import { DefaultTheme } from 'react-jss';
import CssValue from '../utils/style/CssValue';

export type ThemeModel = DefaultTheme & typeof defaultTheme;

export const defaultTheme = {
	colors: {
		button: {
			background: '#00000000',
			backgroundHover: '#00000006',
		},
		text: {
			default: '#BBB',
			inverted: '#FFF',
		},
		border: {
			default: '#BBB',
			selected: '#3AF',
		},
		background: {
			default: '#FFF',
			disabled: '#EEE',
		},
	},
	dimensions: {
		monthCalendarBorderWidth: CssValue.pxl(1),
	},
};
