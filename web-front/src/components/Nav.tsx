import React, { HTMLAttributes, PropsWithChildren } from 'react';

enum NavType {
	MainNav = 'Main Navigation',
	SecondaryNav = 'Secondary Navigation',
	FooterNav = 'Footer Navigation',
}

/**
 * Component props
 * @property {string} [classes] - The class names to apply to the 'nav' HTML element
 * @property {NavType} type - The kind of nav the component is used for
 */
type NavProps = {
	classes?: string;
	type: NavType;
} & HTMLAttributes<HTMLElement>;

/**
 * Nav
 * Wrapper around a 'nav' HTML element.
 *
 * @param {NavProps} props - Props of the component: {@link NavProps} |
 * @param classes
 * @param type
 * @param children
 */
export const Nav: React.FC<NavProps> = ({ classes, type, children, ...props }: PropsWithChildren<NavProps>) => (
	<nav {...props} className={classes} aria-label={type}>
		{children}
	</nav>
);
