import { ICS_NULL_PROPERTY, ICSNullProperty, ICSProperty } from '../model/ICSProperties';

export abstract class ICSComponent {
	protected static readonly listToICS = (p: { toICS: () => string }[]) => p.map((p) => p.toICS()).join('');

	protected abstract readonly componentName: string;

	protected abstract getProperties(): ICSProperty[];

	protected abstract getComponents(): ICSComponent[];

	/***********   EXPORT   **********/

	toICS(): string {
		const properties = ICSComponent.listToICS(this.getProperties());
		const components = ICSComponent.listToICS(this.getComponents());
		return `BEGIN:${this.componentName}\r\n${properties}${components}END:${this.componentName}`;
	}
}

//////////////////////////////////////////////////////////////////////
/////////////////////// STANDARD PROPERTIES //////////////////////////
//////////////////////////////////////////////////////////////////////

type ICSStandardUniqueProperties = {
	dtStamp: ICSProperty;
	uid: ICSProperty;
	class?: ICSProperty;
	created?: ICSProperty;
	dtStart?: ICSProperty;
	lastMod?: ICSProperty;
	organizer?: ICSProperty;
	recurId?: ICSProperty;
	rrule?: ICSProperty;
	seq?: ICSProperty;
	status?: ICSProperty;
	summary?: ICSProperty;
	url?: ICSProperty;
};

type ICSStandardListProperties = {
	attach?: ICSProperty[];
	attendee?: ICSProperty[];
	categories?: ICSProperty[];
	comment?: ICSProperty[];
	contact?: ICSProperty[];
	exDate?: ICSProperty[];
	rStatus?: ICSProperty[];
	related?: ICSProperty[];
	rDate?: ICSProperty[];
};

export type ICSStandardPartialProperties = ICSStandardUniqueProperties & ICSStandardListProperties;

export type ICSPropertiesFromTypes<A, B> = { [K in keyof A]-?: A[K] | ICSNullProperty } & { [J in keyof B]-?: B[J] };

export type ICSStandardProperties = ICSPropertiesFromTypes<ICSStandardUniqueProperties, ICSStandardListProperties>;

export const icsStandardPropertiesFromPartial = (properties: ICSStandardPartialProperties): ICSStandardProperties => ({
	dtStamp: properties.dtStamp,
	uid: properties.uid,
	class: properties.class ?? ICS_NULL_PROPERTY,
	created: properties.created ?? ICS_NULL_PROPERTY,
	dtStart: properties.dtStart ?? ICS_NULL_PROPERTY,
	lastMod: properties.lastMod ?? ICS_NULL_PROPERTY,
	organizer: properties.organizer ?? ICS_NULL_PROPERTY,
	recurId: properties.recurId ?? ICS_NULL_PROPERTY,
	rrule: properties.rrule ?? ICS_NULL_PROPERTY,
	seq: properties.seq ?? ICS_NULL_PROPERTY,
	status: properties.status ?? ICS_NULL_PROPERTY,
	summary: properties.summary ?? ICS_NULL_PROPERTY,
	url: properties.url ?? ICS_NULL_PROPERTY,
	attach: properties.attach ?? [],
	attendee: properties.attendee ?? [],
	categories: properties.categories ?? [],
	comment: properties.comment ?? [],
	contact: properties.contact ?? [],
	exDate: properties.exDate ?? [],
	related: properties.related ?? [],
	rDate: properties.rDate ?? [],
	rStatus: properties.rStatus ?? [],
});

export const icsGetStandardPropertiesList = (properties: ICSStandardProperties): ICSProperty[] => [
	properties.dtStamp,
	properties.uid,
	properties.class,
	properties.created,
	properties.dtStart,
	properties.lastMod,
	properties.organizer,
	properties.recurId,
	properties.rrule,
	properties.seq,
	properties.status,
	properties.summary,
	properties.url,
	...properties.attach,
	...properties.attendee,
	...properties.categories,
	...properties.comment,
	...properties.contact,
	...properties.exDate,
	...properties.related,
	...properties.rDate,
	...properties.rStatus,
];
