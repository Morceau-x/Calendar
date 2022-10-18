import { ButtonHTMLAttributes } from 'react';
import { NavLinkProps } from 'react-router-dom';

export enum ButtonActions {
	ExternalLink = 'ExternalLink',
	Link = 'Link',
	Normal = 'Normal',
}

//export type ButtonActionsType = keyof typeof ButtonActions;

export type LinkButtonProps = {
	type: ButtonActions.Link;
	props: NavLinkProps;
};

export type ExternalLinkButtonProps = {
	type: ButtonActions.ExternalLink;
	path: string;
};

export type NormalButtonProps = {
	type: ButtonActions.Normal;
	props: ButtonHTMLAttributes<HTMLButtonElement>;
};

export type ButtonActionProps = LinkButtonProps | ExternalLinkButtonProps | NormalButtonProps;
