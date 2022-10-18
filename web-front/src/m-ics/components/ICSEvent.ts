import { ICS_NULL_PROPERTY, ICSProperty } from '../model/ICSProperties';
import {
	ICSComponent,
	icsGetStandardPropertiesList,
	ICSPropertiesFromTypes,
	ICSStandardPartialProperties,
	ICSStandardProperties,
	icsStandardPropertiesFromPartial,
} from './ICSComponent';
import { ICSAlarm } from './ICSAlarm';
import { ICSFullType, ICSPartialType } from '../model/ICSTypes';

type EventUniqueProperties = {
	description?: ICSProperty;
	dtEnd?: ICSProperty;
	duration?: ICSProperty;
	geo?: ICSProperty;
	location?: ICSProperty;
	priority?: ICSProperty;
	transp?: ICSProperty;
};

type EventListProperties = {
	resources?: ICSProperty[];
	xProperties?: ICSProperty[];
};

export type ICSEventPartialProperties = EventUniqueProperties & EventListProperties & ICSStandardPartialProperties & ICSPartialType;

export type ICSEventProperties = ICSPropertiesFromTypes<EventUniqueProperties, EventListProperties> & ICSStandardProperties;

export type ICSEventFullProperties = ICSEventProperties & ICSFullType;

export class ICSEvent extends ICSComponent {
	protected readonly componentName = 'VEVENT';

	readonly properties: ICSEventProperties;

	protected readonly components: ICSAlarm[] = [];

	protected constructor(properties: ICSEventPartialProperties | ICSEventFullProperties, alarms: ICSAlarm[] = []) {
		super();
		if (properties.partial) {
			const standardProperties = icsStandardPropertiesFromPartial(properties);
			const eventProperties = {
				description: properties.description ?? ICS_NULL_PROPERTY,
				dtEnd: properties.dtEnd ?? ICS_NULL_PROPERTY,
				duration: properties.duration ?? ICS_NULL_PROPERTY,
				geo: properties.geo ?? ICS_NULL_PROPERTY,
				location: properties.location ?? ICS_NULL_PROPERTY,
				priority: properties.priority ?? ICS_NULL_PROPERTY,
				transp: properties.transp ?? ICS_NULL_PROPERTY,
				resources: properties.resources ?? [],
				xProperties: properties.xProperties ?? [],
			};
			this.properties = {
				...standardProperties,
				...eventProperties,
			};
		} else this.properties = properties;
		this.components = alarms;
	}

	protected getComponents(): ICSComponent[] {
		return this.components;
	}

	protected override getProperties(): ICSProperty[] {
		return [
			this.properties.description,
			this.properties.dtEnd,
			this.properties.duration,
			this.properties.geo,
			this.properties.location,
			this.properties.priority,
			this.properties.transp,
			...this.properties.resources,
			...this.properties.xProperties,
			...icsGetStandardPropertiesList(this.properties),
		];
	}
}
