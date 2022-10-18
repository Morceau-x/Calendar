import { State, useAppSelector } from '../state/Store';
import React from 'react';
import { NavLink, NavLinkProps, Redirect, Route, RouteProps } from 'react-router-dom';
import { isAuthenticated } from '../models/AuthModel';

//////////////////////////////////////////////////////////////////////
//////////////////////////// Validation //////////////////////////////
//////////////////////////////////////////////////////////////////////

export type RouteValidation = { validator: (state: State) => boolean; redirect: string };

export const requireAuth: (redirect: string) => RouteValidation = (redirect) => ({ validator: (state) => isAuthenticated(state.auth), redirect });

//////////////////////////////////////////////////////////////////////
////////////////////////////// Types /////////////////////////////////
//////////////////////////////////////////////////////////////////////

export type Routes = { [key: string]: RoutePath };
export type RoutePath = string | ({ route: string } & Routes);

//////////////////////////////////////////////////////////////////////
//////////////////////////// Components //////////////////////////////
//////////////////////////////////////////////////////////////////////

type ExactRouteProps = Omit<RouteProps, 'exact' | 'component' | 'render'>;
type ValidatedRouteProps = {
	validation: RouteValidation[];
} & ExactRouteProps;
type ExactNavLinkProps = Omit<NavLinkProps, 'exact'>;

export const ValidatedRoute: React.FC<ValidatedRouteProps> = ({ children, validation, ...routeProps }: ValidatedRouteProps) => {
	const state = useAppSelector((state) => state);
	const redirection = validation.reduce<string | undefined>((previousValue, currentValue: RouteValidation) => {
		if (previousValue) return previousValue;
		return currentValue.validator(state) ? undefined : currentValue.redirect;
	}, undefined);

	return (
		<Route
			exact
			{...routeProps}
			render={({ location }) =>
				redirection != undefined ? (
					<Redirect
						to={{
							pathname: redirection,
							state: { from: location },
						}}
					/>
				) : (
					children
				)
			}
		/>
	);
};

export const ExactRoute: React.FC<ExactRouteProps> = (routeProps: ExactRouteProps) => <Route exact {...routeProps} />;
export const ExactNavLink: React.FC<ExactNavLinkProps> = (navLinkProps: ExactNavLinkProps) => <NavLink exact {...navLinkProps} />;
