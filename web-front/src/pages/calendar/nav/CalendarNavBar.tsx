import React from 'react';
import { createUseStyles } from 'react-jss';
import { Style } from '../../../utils/style/JssUtils';
import { ExactNavLink } from '../../../utils/RouteUtils';
import { routes } from '../../../utils/Routes';
import { useRouteMatch } from 'react-router-dom';
import { DateTime } from 'luxon';
import { useAppSelector } from '../../../state/Store';
import { isAuthenticated } from '../../../models/AuthModel';
import { ButtonActions } from '../../../components/buttons/Button';
import { Icons } from '../../../components/icons/SvgIcon';
import { IconButton } from '../../../components/buttons/IconButton';
import { useAppTranslation } from '../../../utils/intl/I18nOptions';

/**
 * Component props
 */
type CalendarNavBarProps = {
	leftMenu: {
		expanded: boolean;
		onClick: () => void;
	};
	settingsMenu: {
		expanded: boolean;
		onClick: () => void;
	};
};

/**
 * NavBar
 * React Functional Component
 *
 * @param props
 */
export const CalendarNavBar: React.VoidFunctionComponent<CalendarNavBarProps> = (props: CalendarNavBarProps) => {
	const classes = createUseStyles(styles)(props);
	const auth = useAppSelector((state) => state.auth);
	const { url } = useRouteMatch();
	const { t, i18n, ready } = useAppTranslation();
	const language = i18n.language || 'en';

	return (
		<div className={classes.root}>
			<button className={classes.leftMenu} onClick={props.leftMenu.onClick}>
				<h4>{props.leftMenu.expanded ? 'Collapse' : 'Expand'}</h4>
			</button>
			<div className={classes.titleAndLogo}>
				<h2>{'calendar'}</h2>
			</div>
			<div className={classes.navElements}>
				<ExactNavLink className={classes.navItem} to={url.concat(routes.calendar.day)} activeClassName={classes.activeNavItem}>
					<span>{'Day'}</span>
				</ExactNavLink>
				<ExactNavLink className={classes.navItem} to={url.concat(routes.calendar.week)} activeClassName={classes.activeNavItem}>
					<span>{'Week'}</span>
				</ExactNavLink>
				<ExactNavLink className={classes.navItem} to={url.concat(routes.calendar.month)} activeClassName={classes.activeNavItem}>
					<span>{'Month'}</span>
				</ExactNavLink>
				<ExactNavLink className={classes.navItem} to={url.concat(routes.calendar.year)} activeClassName={classes.activeNavItem}>
					<span>{'Year'}</span>
				</ExactNavLink>
			</div>
			<div className={classes.nextDate}>
				<h4>{'<'}</h4>
			</div>
			<div className={classes.date}>
				<h2>{DateTime.now().toFormat('DDDD', { locale: language })}</h2>
			</div>
			<div className={classes.prevDate}>
				<h4>{'>'}</h4>
			</div>
			<div className={classes.profile}>
				<h2>{isAuthenticated(auth) ? 'Profile' : 'Connect'}</h2>
			</div>
			<div className={classes.settings}>
				<IconButton
					classes={{ button: classes.iconButtonStyle }}
					action={{ type: ButtonActions.Normal, props: { onClick: props.settingsMenu.onClick } }}
					icon={props.settingsMenu.expanded ? Icons.arrowRight : Icons.settings}
					iconProps={{
						width: 30,
						height: 30,
					}}
				/>
			</div>
		</div>
	);
};

//////////////////////////////////////////////////////////////////////
/////////////////////////////// Style ////////////////////////////////
//////////////////////////////////////////////////////////////////////

const root: Style = {
	display: 'flex',
	alignItems: 'stretch',
	borderColor: 'black',
	borderWidth: '1px',
	borderStyle: 'solid',
};

const leftMenu: Style<CalendarNavBarProps> = {
	borderColor: 'blue',
	borderWidth: '1px',
	borderStyle: 'solid',
};
const titleAndLogo: Style = {
	borderColor: 'red',
	borderWidth: '1px',
	borderStyle: 'solid',
};

const navElements: Style = {
	borderColor: 'orange',
	borderWidth: '1px',
	borderStyle: 'solid',
	display: 'flex',
	alignItems: 'stretch',
};

const navItem: Style = {
	color: 'black',
	textDecorationLine: 'unset',
	display: 'inline-flex',
	alignItems: 'center',
	padding: '10px',
	margin: '10px',
};

const activeNavItem: Style = {
	color: 'white',
	backgroundColor: 'black',
};

const nextDate: Style = {
	borderColor: 'green',
	borderWidth: '1px',
	borderStyle: 'solid',
	padding: '0 20px',
};

const date: Style = {
	borderColor: 'green',
	borderWidth: '1px',
	borderStyle: 'solid',
	flexGrow: '1',
	textAlign: 'center',
};

const prevDate: Style = {
	borderColor: 'green',
	borderWidth: '1px',
	borderStyle: 'solid',
	padding: '0 20px',
};

const profile: Style = {
	borderColor: 'blue',
	borderWidth: '1px',
	borderStyle: 'solid',
	padding: '0 20px',
};

const settings: Style = {
	borderColor: 'red',
	borderWidth: '1px',
	borderStyle: 'solid',
	display: 'inline-flex',
	alignItems: 'center',
};

const iconButtonStyle: Style = {
	padding: '3px 10px',
};

const styles = {
	root,
	leftMenu,
	titleAndLogo,
	navElements,
	navItem,
	activeNavItem,
	nextDate,
	date,
	prevDate,
	profile,
	settings,
	iconButtonStyle,
};
