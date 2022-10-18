import { Classes, JssStyle, Styles } from 'jss';

export const combineClasses = (...classes: (string | undefined)[]): string => {
	return classes.join(' ');
};

export type JssClasses<T, S extends Styles | ((theme: T) => Styles)> = Classes<S extends (theme: T) => Styles ? keyof ReturnType<S> : keyof S>;
type Func<P, T, R> = T extends undefined ? (data: P) => R : (data: P & { theme: T }) => R;
export type Style<P = unknown, T = undefined> = JssStyle<P, T> | Func<P, T, JssStyle<undefined, undefined>>;
