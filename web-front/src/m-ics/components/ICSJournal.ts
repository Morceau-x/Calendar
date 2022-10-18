import { ICSProperty } from '../model/ICSProperties';
import {
	ICSComponent,
	icsGetStandardPropertiesList,
	ICSPropertiesFromTypes,
	ICSStandardPartialProperties,
	ICSStandardProperties,
	icsStandardPropertiesFromPartial,
} from './ICSComponent';
import { ICSFullType, ICSPartialType } from '../model/ICSTypes';

type JournalListProperties = {
	description?: ICSProperty[];
	xProperties?: ICSProperty[];
};

export type ICSJournalPartialProperties = JournalListProperties & ICSStandardPartialProperties & ICSPartialType;

export type ICSJournalProperties = ICSPropertiesFromTypes<{}, JournalListProperties> & ICSStandardProperties;

export type ICSJournalFullProperties = ICSJournalProperties & ICSFullType;

export class ICSJournal extends ICSComponent {
	protected readonly componentName = 'VJOURNAL';

	readonly properties: ICSJournalProperties;

	protected constructor(properties: ICSJournalPartialProperties | ICSJournalFullProperties) {
		super();
		if (properties.partial) {
			const standardProperties = icsStandardPropertiesFromPartial(properties);
			const eventProperties = {
				description: properties.description ?? [],
				xProperties: properties.xProperties ?? [],
			};
			this.properties = {
				...standardProperties,
				...eventProperties,
			};
		} else this.properties = properties;
	}

	protected getComponents(): ICSComponent[] {
		return [];
	}

	protected override getProperties(): ICSProperty[] {
		return [...this.properties.description, ...this.properties.xProperties, ...icsGetStandardPropertiesList(this.properties)];
	}
}
