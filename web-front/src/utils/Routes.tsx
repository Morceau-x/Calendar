import React from 'react';
import { ExactRoute } from './RouteUtils';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { Calendar, CalendarProps } from '../pages/calendar/Calendar';
import { calendarRoutes } from '../pages/calendar/CalendarRoutes';

export const routes = {
	test: '/test',
	calendar: {
		route: '/calendar',
		...calendarRoutes,
	},
};

export type RouterProps = {
	calendarProps?: CalendarProps;
};

export const Router: React.VFC<RouterProps> = (props: RouterProps) => {
	return (
		<BrowserRouter>
			<Switch>
				<ExactRoute path={routes.calendar.route}>
					<Calendar {...props.calendarProps} />
				</ExactRoute>
				<ExactRoute strict path={'/'}>
					<Redirect to={routes.calendar.route} />
				</ExactRoute>
			</Switch>
		</BrowserRouter>
	);
};
