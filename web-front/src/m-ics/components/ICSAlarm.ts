/** @format */

import { ICS_NULL_PROPERTY, ICSProperty } from '../model/ICSProperties';
import { ICSComponent, ICSPropertiesFromTypes } from './ICSComponent';
import { ICSFullType, ICSPartialType } from '../model/ICSTypes';

enum AlarmType {
	AUDIO_ALARM,
	DISPLAY_ALARM,
	EMAIL_ALARM,
}

type AudioType = { type: AlarmType.AUDIO_ALARM };
type AlarmUniquePropertiesAudio = {
	action: ICSProperty;
	trigger: ICSProperty;
	duration?: ICSProperty;
	repeat?: ICSProperty;
	attach?: ICSProperty;
};

type AlarmListPropertiesAudio = {
	xProperties?: ICSProperty[];
};

type DisplayType = { type: AlarmType.DISPLAY_ALARM };

type AlarmUniquePropertiesDisplay = {
	action: ICSProperty;
	description: ICSProperty;
	trigger: ICSProperty;
	duration?: ICSProperty;
	repeat?: ICSProperty;
};

type AlarmListPropertiesDisplay = {
	xProperties?: ICSProperty[];
};

type EmailType = { type: AlarmType.EMAIL_ALARM };

type AlarmUniquePropertiesEmail = {
	action: ICSProperty;
	description: ICSProperty;
	trigger: ICSProperty;
	summary: ICSProperty;
	firstAttendee: ICSProperty;
	duration?: ICSProperty;
	repeat?: ICSProperty;
};

type AlarmListPropertiesEmail = {
	otherAttendees: ICSProperty[];
	attach: ICSProperty[];
	xProperties?: ICSProperty[];
};

type fieldList<T> = Extract<T, ''>;

export type ICSAlarmPartialProperties = (
	| (AlarmUniquePropertiesAudio & AlarmListPropertiesAudio & AudioType)
	| (AlarmUniquePropertiesDisplay & AlarmListPropertiesDisplay & DisplayType)
	| (AlarmUniquePropertiesEmail & AlarmListPropertiesEmail & EmailType)
) &
	ICSPartialType;

export type ICSAlarmProperties =
	| (ICSPropertiesFromTypes<AlarmUniquePropertiesAudio, AlarmListPropertiesAudio> & AudioType)
	| (ICSPropertiesFromTypes<AlarmUniquePropertiesDisplay, AlarmListPropertiesDisplay> & DisplayType)
	| (ICSPropertiesFromTypes<AlarmUniquePropertiesEmail, AlarmListPropertiesEmail> & EmailType);

export type ICSAlarmFullProperties = ICSAlarmProperties & ICSFullType;

type AlarmFields = fieldList<ICSAlarmProperties>;

export class ICSAlarm extends ICSComponent {
	protected readonly componentName = 'VFREEBUSY';

	readonly properties: ICSAlarmProperties;

	protected constructor(properties: ICSAlarmPartialProperties | ICSAlarmFullProperties) {
		super();
		switch (properties.type) {
			case AlarmType.AUDIO_ALARM:
				this.properties = {
					type: AlarmType.AUDIO_ALARM,
					action: properties.action,
					trigger: properties.trigger,
					duration: properties.duration ?? ICS_NULL_PROPERTY,
					repeat: properties.repeat ?? ICS_NULL_PROPERTY,
					attach: properties.attach ?? ICS_NULL_PROPERTY,
					xProperties: properties.xProperties ?? [],
				};
				break;
			case AlarmType.DISPLAY_ALARM:
				this.properties = {
					type: AlarmType.DISPLAY_ALARM,
					action: properties.action,
					description: properties.description,
					trigger: properties.trigger,
					duration: properties.duration ?? ICS_NULL_PROPERTY,
					repeat: properties.repeat ?? ICS_NULL_PROPERTY,
					xProperties: properties.xProperties ?? [],
				};
				break;
			case AlarmType.EMAIL_ALARM:
				this.properties = {
					type: AlarmType.EMAIL_ALARM,
					action: properties.action,
					description: properties.description,
					trigger: properties.trigger,
					summary: properties.summary,
					firstAttendee: properties.firstAttendee,
					duration: properties.duration ?? ICS_NULL_PROPERTY,
					repeat: properties.repeat ?? ICS_NULL_PROPERTY,
					otherAttendees: properties.otherAttendees ?? [],
					attach: properties.attach ?? [],
					xProperties: properties.xProperties ?? [],
				};
				break;
		}
	}

	protected getComponents(): ICSComponent[] {
		return [];
	}

	protected override getProperties(): ICSProperty[] {
		switch (this.properties.type) {
			case AlarmType.AUDIO_ALARM:
				return [];
			case AlarmType.DISPLAY_ALARM:
				return [];
			case AlarmType.EMAIL_ALARM:
				return [];
		}
	}
}
