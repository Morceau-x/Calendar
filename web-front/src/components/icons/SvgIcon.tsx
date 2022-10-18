import { ArrowRightIcon, SettingsIcon } from './BasicIcons';
import { DiscordIcon, TwitchIcon, YoutubeIcon } from './SocialIcons';
import React from 'react';

export type SvgIconComponent = React.VoidFunctionComponent<React.SVGProps<SVGSVGElement>>;

export const Icons = {
	arrowRight: ArrowRightIcon,
	discord: DiscordIcon,
	settings: SettingsIcon,
	twitch: TwitchIcon,
	youtube: YoutubeIcon,
};
