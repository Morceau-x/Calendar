import React, { CSSProperties, HTMLAttributes } from 'react';
import { createUseStyles, Styles, useTheme } from 'react-jss';
import { ThemeModel } from '../../models/ThemeModel';
import { combineClasses } from '../../utils/style/JssUtils';

/**
 * MonthBox Props
 * classes: {
 *     root: Root div element of the component
 * }
 * monthNumber: the day of the month the box represents
 * data: the events to display in the box
 */
type Props = {
	dayOfMonth: number;

	containerProps?: HTMLAttributes<HTMLDivElement>;

	classes?: {
		root?: string;
		dynamicStyles: CSSProperties | null;
	};
};

/**
 * MonthBox
 * React Functional Component
 *
 * @param props
 */
export default function MonthBox(props: Props): JSX.Element {
	const theme = useTheme<ThemeModel>();
	const classes = useStyles({ theme });
	const rootClasses = props.classes?.root == undefined ? classes.root : combineClasses(classes.root, props.classes.root);

	return (
		<div
			{...props.containerProps}
			onClick={(e) => (e.target as HTMLDivElement).focus()}
			style={{ ...props.classes?.dynamicStyles }}
			className={rootClasses}
		>
			<div className={classes.content}>{props.dayOfMonth == undefined ? '' : props.dayOfMonth}</div>
		</div>
	);
}

const useStyles = createUseStyles(
	(theme: ThemeModel): Styles => ({
		root: {
			borderColor: theme.colors.border.default,
			borderStyle: 'solid',
			borderWidth: theme.dimensions.monthCalendarBorderWidth.toCss(),
			userSelect: 'none',
			backgroundColor: theme.colors.background.default,
			outlineColor: theme.colors.border.default,

			'&.disabled': {
				backgroundColor: theme.colors.background.disabled,
			},
			'&:hover': {
				transform: 'scale(1.02)',
				zIndex: 2,

				outlineStyle: 'solid',
				outlineOffset: `calc(-${theme.dimensions.monthCalendarBorderWidth.toCss()})`,
				outlineWidth: `calc(${theme.dimensions.monthCalendarBorderWidth.toCss()} * 2)`,
			},
			'&:focus': {
				zIndex: 1,

				outlineStyle: 'solid',
				outlineOffset: `calc(-${theme.dimensions.monthCalendarBorderWidth.toCss()})`,
				outlineColor: theme.colors.border.selected,
				outlineWidth: `calc(${theme.dimensions.monthCalendarBorderWidth.toCss()} * 3)`,
			},
		},
		content: {
			padding: '10px',
		},
	})
);
