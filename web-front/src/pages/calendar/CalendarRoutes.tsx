import React from 'react';
import { Redirect, Switch, useRouteMatch } from 'react-router-dom';
import { ExactRoute } from '../../utils/RouteUtils';
import { MonthCalendar, MonthCalendarProps } from '../month_calendar/MonthCalendar';

export const calendarRoutes = {
	day: '/day',
	week: '/week',
	month: '/month',
	year: '/year',
};

export type CalendarRouterProps = {
	monthProps: MonthCalendarProps;
};

export const CalendarRouter: React.VFC<CalendarRouterProps> = (props: CalendarRouterProps) => {
	const { path, url } = useRouteMatch();
	return (
		<Switch>
			<ExactRoute path={path.concat(calendarRoutes.day)}>
				<></>
			</ExactRoute>
			<ExactRoute path={path.concat(calendarRoutes.week)}>
				<></>
			</ExactRoute>
			<ExactRoute path={path.concat(calendarRoutes.month)}>
				<></>
			</ExactRoute>
			<ExactRoute path={path.concat(calendarRoutes.year)}>
				<></>
			</ExactRoute>
			<ExactRoute path={path.concat('/')}>
				<Redirect to={url.concat(calendarRoutes.month)} />
			</ExactRoute>
		</Switch>
	);
};
