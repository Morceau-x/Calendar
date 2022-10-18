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

type TodoUniqueProperties = {
	completed?: ICSProperty;
	description?: ICSProperty;
	due?: ICSProperty;
	duration?: ICSProperty;
	geo?: ICSProperty;
	location?: ICSProperty;
	percent?: ICSProperty;
	priority?: ICSProperty;
};

type TodoListProperties = {
	resources?: ICSProperty[];
	xProperties?: ICSProperty[];
};

export type ICSTodoPartialProperties = TodoUniqueProperties & TodoListProperties & ICSStandardPartialProperties & ICSPartialType;

export type ICSTodoProperties = ICSPropertiesFromTypes<TodoUniqueProperties, TodoListProperties> & ICSStandardProperties;

export type ICSTodoFullProperties = ICSTodoProperties & ICSFullType;

export class ICSTodo extends ICSComponent {
	protected readonly componentName = 'VTODO';

	readonly properties: ICSTodoProperties;

	protected readonly components: ICSAlarm[] = [];

	protected constructor(properties: ICSTodoPartialProperties | ICSTodoFullProperties, alarms: ICSAlarm[] = []) {
		super();
		if (properties.partial) {
			const standardProperties = icsStandardPropertiesFromPartial(properties);
			const eventProperties = {
				completed: properties.completed ?? ICS_NULL_PROPERTY,
				description: properties.description ?? ICS_NULL_PROPERTY,
				due: properties.due ?? ICS_NULL_PROPERTY,
				duration: properties.duration ?? ICS_NULL_PROPERTY,
				geo: properties.geo ?? ICS_NULL_PROPERTY,
				location: properties.location ?? ICS_NULL_PROPERTY,
				percent: properties.percent ?? ICS_NULL_PROPERTY,
				priority: properties.priority ?? ICS_NULL_PROPERTY,
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
			this.properties.completed,
			this.properties.description,
			this.properties.due,
			this.properties.duration,
			this.properties.geo,
			this.properties.location,
			this.properties.percent,
			this.properties.priority,
			...this.properties.resources,
			...this.properties.xProperties,
			...icsGetStandardPropertiesList(this.properties),
		];
	}
}
