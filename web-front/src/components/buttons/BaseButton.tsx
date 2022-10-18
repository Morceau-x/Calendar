import React, { PropsWithChildren } from 'react';
import { ExactNavLink } from '../../utils/RouteUtils';
import { ButtonActionProps, ButtonActions } from './Button';

/**
 * Component props
 */
export type BaseButtonProps = {
	action: ButtonActionProps;
	classes?: {
		button?: string;
	};
};

/**
 * IconButton
 * React Functional Component
 *
 * @param props
 */
export const BaseButton: React.FC<BaseButtonProps> = (props: PropsWithChildren<BaseButtonProps>) => {
	//const theme = useTheme<ThemeModel>();
	//const classes = createUseStyles(styles)({ ...props, theme });

	switch (props.action.type) {
		case ButtonActions.Normal:
			return (
				<button {...props.action.props} className={props.classes?.button}>
					{props.children}
				</button>
			);
		case ButtonActions.Link:
			return (
				<ExactNavLink {...props.action.props} className={props.classes?.button}>
					{props.children}
				</ExactNavLink>
			);
		default:
			return <></>;
	}
};

//const root: Style<BaseButtonProps, ThemeModel> = {};

//const styles = (theme: ThemeModel) => ({
//	root: root,
//});
