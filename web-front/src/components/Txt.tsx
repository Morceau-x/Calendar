import React from 'react';

type Props<P extends React.ElementType = 'span'> = {
	component?: P;
	componentProps?: React.ComponentProps<P>;

	classes?: string;
};

export default function Txt<P extends React.ElementType = 'span'>(props: React.PropsWithChildren<Props<P>>): JSX.Element {
	const component: { value: React.ElementType } = {
		value: props.component || 'span',
	};
	const componentProps = props.component ? props.componentProps : {};

	return <component.value {...componentProps}>{props.children}</component.value>;
}
