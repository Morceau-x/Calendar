import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { ThemeModel } from '../../models/ThemeModel';
import { JssClasses, Style } from '../../utils/style/JssUtils';

/**
 * Component props
 */
type CalendarMenuProps = {
	// Empty
};

/**
 * CalendarMenu
 * React Functional Component
 *
 * @param props
 */
export const CalendarMenu: React.VFC<CalendarMenuProps> = (props: CalendarMenuProps) => {
	const theme = useTheme<ThemeModel>();
	const classes = createUseStyles(styles)({ theme });

	return <></>;
};

const root: Style<CalendarMenuProps, ThemeModel> = {};

const styles = (theme: ThemeModel) => ({
	root: root,
});
