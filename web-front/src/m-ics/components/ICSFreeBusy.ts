import { ICS_NULL_PROPERTY, ICSProperty } from '../model/ICSProperties';
import { ICSComponent, ICSPropertiesFromTypes } from './ICSComponent';
import { ICSFullType, ICSPartialType } from '../model/ICSTypes';

type FreeBusyUniqueProperties = {
	dtStamp: ICSProperty;
	uid: ICSProperty;
	contact?: ICSProperty;
	dtStart?: ICSProperty;
	dtEnd?: ICSProperty;
	organizer?: ICSProperty;
	url?: ICSProperty;
};

type FreeBusyListProperties = {
	attendee?: ICSProperty[];
	comment?: ICSProperty[];
	freeBusy?: ICSProperty[];
	rStatus?: ICSProperty[];
	xProperties?: ICSProperty[];
};

export type ICSFreeBusyPartialProperties = FreeBusyUniqueProperties & FreeBusyListProperties & ICSPartialType;

export type ICSFreeBusyProperties = ICSPropertiesFromTypes<FreeBusyUniqueProperties, FreeBusyListProperties>;

export type ICSFreeBusyFullProperties = ICSFreeBusyProperties & ICSFullType;

export class ICSFreeBusy extends ICSComponent {
	protected readonly componentName = 'VFREEBUSY';

	readonly properties: ICSFreeBusyProperties;

	protected constructor(properties: ICSFreeBusyPartialProperties | ICSFreeBusyFullProperties) {
		super();
		if (properties.partial) {
			this.properties = {
				dtStamp: properties.dtStamp,
				uid: properties.uid,
				contact: properties.contact ?? ICS_NULL_PROPERTY,
				dtStart: properties.dtStart ?? ICS_NULL_PROPERTY,
				dtEnd: properties.dtEnd ?? ICS_NULL_PROPERTY,
				organizer: properties.organizer ?? ICS_NULL_PROPERTY,
				url: properties.url ?? ICS_NULL_PROPERTY,
				attendee: properties.attendee ?? [],
				comment: properties.comment ?? [],
				freeBusy: properties.freeBusy ?? [],
				rStatus: properties.rStatus ?? [],
				xProperties: properties.xProperties ?? [],
			};
		} else this.properties = properties;
	}

	protected getComponents(): ICSComponent[] {
		return [];
	}

	protected override getProperties(): ICSProperty[] {
		return [
			this.properties.dtStamp,
			this.properties.uid,
			this.properties.contact,
			this.properties.dtStart,
			this.properties.dtEnd,
			this.properties.organizer,
			this.properties.url,
			...this.properties.attendee,
			...this.properties.comment,
			...this.properties.freeBusy,
			...this.properties.rStatus,
			...this.properties.xProperties,
		];
	}
}
