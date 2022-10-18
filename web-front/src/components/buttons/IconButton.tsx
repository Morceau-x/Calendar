import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { ThemeModel } from '../../models/ThemeModel';
import { combineClasses, Style } from '../../utils/Style/JssUtils';
import { BaseButton, BaseButtonProps } from './BaseButton';
import { SvgIconComponent } from '../icons/SvgIcon';

/**
 * Component props
 */
type IconButtonProps = {
	classes?: {
		button: string;
	};
	icon: SvgIconComponent;
	iconProps?: React.ComponentPropsWithoutRef<SvgIconComponent>;
} & BaseButtonProps;

/**
 * IconButton
 * React Functional Component
 *
 * @param props
 */
export const IconButton: React.VFC<IconButtonProps> = (props: IconButtonProps) => {
	const theme = useTheme<ThemeModel>();
	const classes = createUseStyles(styles)({ theme });

	return (
		<BaseButton {...props} classes={{ button: combineClasses(classes.plainButton, props.classes?.button) }}>
			<props.icon {...props.iconProps} />
		</BaseButton>
	);
};

const plainButton = (theme: ThemeModel): Style<unknown, ThemeModel> => ({
	border: 'none',
	backgroundColor: theme.colors.button.background,
	cursor: 'pointer',
	'&:hover': {
		backgroundColor: theme.colors.button.backgroundHover,
	},
});

const styles = (theme: ThemeModel) => ({
	plainButton: plainButton(theme),
});
