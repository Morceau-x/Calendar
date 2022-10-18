import React, { useState } from 'react';
import { DateTime } from 'luxon';
import { CalendarRouter } from './CalendarRoutes';
import { createUseStyles, useTheme } from 'react-jss';
import { ThemeModel } from '../../models/ThemeModel';
import { JssClasses } from '../../utils/style/JssUtils';
import { CalendarNavBar } from './nav/CalendarNavBar';
import { CalendarSettings } from './CalendarSettings';
import { CalScaleProperty, ICSProperty, MethodProperty, ProdIdProperty, VersionProperty } from '../../m-ics/model/ICSProperties';
import { ICSFile } from '../../m-ics/ICSCalendar';
import { ICSComponent } from '../../m-ics/components/ICSComponent';

/**
 * Component props
 */
export type CalendarProps = {
	// Empty
};

/**
 * Calendar
 * React Functional Component
 *
 */
export const Calendar: React.VFC<CalendarProps> = () => {
	const theme = useTheme<ThemeModel>();
	const classes: JssClasses<ThemeModel, typeof styles> = createUseStyles(styles)({ theme });

	const now = DateTime.utc();

	const [menuExpanded, setMenuExpansion] = useState<boolean>(false);
	const [settingsExpanded, setSettingsExpansion] = useState<boolean>(false);

	const properties = {
		prodId: new ProdIdProperty('-//morceaux//dev//EN'),
		version: new VersionProperty('2.0'),
		properties: [],
	};
	const cal = new ICSFile(properties, new ICSComponent());
	console.log(cal);
	console.log(cal.toICS());
	return (
		<div className={classes.root}>
			<CalendarNavBar
				leftMenu={{
					expanded: menuExpanded,
					onClick: () => {
						if (menuExpanded) setMenuExpansion(false);
						else setMenuExpansion(true);
					},
				}}
				settingsMenu={{
					expanded: settingsExpanded,
					onClick: () => {
						if (settingsExpanded) setSettingsExpansion(false);
						else setSettingsExpansion(true);
					},
				}}
			/>
			<CalendarRouter
				monthProps={{
					date: now,
				}}
			/>
			<CalendarSettings />
		</div>
	);
};

const styles = (_: ThemeModel) => ({
	root: {
		position: 'absolute',
		height: '100vh',
		width: '100vw',
		padding: 0,
		margin: 0,
		overflow: 'hidden',
	},
});
