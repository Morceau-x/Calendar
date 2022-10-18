import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { ThemeModel } from '../../models/ThemeModel';
import { JssClasses } from '../../utils/style/JssUtils';

/**
 * Component props
 */
type Props = {
	// Empty
};

/**
 * MonthPage
 * React Functional Component
 *
 * @param props
 */
export const MonthPage: React.VFC<Props> = () => {
	const theme = useTheme<ThemeModel>();
	const classes: JssClasses<ThemeModel, typeof styles> = createUseStyles(styles)({ theme });

	return <></>;
};

const styles = (theme: ThemeModel) => ({
	root: {},
});
