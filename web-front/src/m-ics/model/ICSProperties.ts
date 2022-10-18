import { MethodType, ProdIdType, VersionType } from './ICSTypes';

export enum PropertyName {
	NULL = '',
	CALSCALE = 'CALSCALE',
	METHOD = 'METHOD',
	PRODID = 'PRODID',
	VERSION = 'VERSION',
	ATTACH = 'ATTACH',
	CATEGORIES = 'CATEGORIES',
	CLASS = 'CLASS',
	COMMENT = 'COMMENT',
	DESCRIPTION = 'DESCRIPTION',
	GEO = 'GEO',
	LOCATION = 'LOCATION',
	PERCENT_COMPLETE = 'PERCENT-COMPLETE',
	PRIORITY = 'PRIORITY',
	RESOURCES = 'RESOURCES',
	STATUS = 'STATUS',
	SUMMARY = 'SUMMARY',
	COMPLETED = 'COMPLETED',
	DTEND = 'DTEND',
	DUE = 'DUE',
	DTSTART = 'DTSTART',
	DURATION = 'DURATION',
	FREEBUSY = 'FREEBUSY',
	TRANSP = 'TRANSP',
	TZID = 'TZID',
	TZNAME = 'TZNAME',
	TZOFFSETFROM = 'TZOFFSETFROM',
	TZOFFSETTO = 'TZOFFSETTO',
	TZURL = 'TZURL',
	ATTENDEE = 'ATTENDEE',
	CONTACT = 'CONTACT',
	ORGANIZER = 'ORGANIZER',
	RECURRENCE_ID = 'RECURRENCE-ID',
	RELATED_TO = 'RELATED-TO',
	URL = 'URL',
	UID = 'UID',
	EXDATE = 'EXDATE',
	RDATE = 'RDATE',
	RRULE = 'RRULE',
	ACTION = 'ACTION',
	REPEAT = 'REPEAT',
	TRIGGER = 'TRIGGER',
	CREATED = 'CREATED',
	DTSTAMP = 'DTSTAMP',
	LAST_MODIFIED = 'LAST-MODIFIED',
	SEQUENCE = 'SEQUENCE',
	REQUEST_STATUS = 'REQUEST-STATUS',
	XML = 'XML',
	TZUNTIL = 'TZUNTIL',
	TZID_ALIAS_OF = 'TZID-ALIAS-OF',
	BUSYTYPE = 'BUSYTYPE',
	NAME = 'NAME',
	REFRESH_INTERVAL = 'REFRESH-INTERVAL',
	SOURCE = 'SOURCE',
	COLOR = 'COLOR',
	IMAGE = 'IMAGE',
	CONFERENCE = 'CONFERENCE',
	CALENDAR_ADDRESS = 'CALENDAR-ADDRESS',
	LOCATION_TYPE = 'LOCATION-TYPE',
	PARTICIPANT_TYPE = 'PARTICIPANT-TYPE',
	RESOURCE_TYPE = 'RESOURCE-TYPE',
	STRUCTURED_DATA = 'STRUCTURED-DATA',
	STYLED_DESCRIPTION = 'STYLED-DESCRIPTION',
	ACKNOWLEDGED = 'ACKNOWLEDGED',
	PROXIMITY = 'PROXIMITY',
}

export abstract class ICSProperty {
	// TODO add parameters
	readonly isNullProperty: boolean = false;
	abstract property: PropertyName;
	abstract value: any;

	abstract valueToString(): string;

	/***********   EXPORT   **********/

	toICS(): string {
		return `${this.property}:${this.valueToString()}\r\n`;
	}
}

export class ICSNullProperty extends ICSProperty {
	override readonly isNullProperty: boolean = true;
	readonly property: PropertyName = PropertyName.NULL;
	readonly value = null;

	constructor() {
		super();
	}

	valueToString(): string {
		return '';
	}
}

export const ICS_NULL_PROPERTY = new ICSNullProperty();

export class ProdIdProperty extends ICSProperty {
	property = PropertyName.PRODID;
	value: string;
	private fmtValue: ProdIdType | null = null;

	constructor(value: string) {
		super();
		this.value = value;
	}

	valueToString(): string {
		return this.value;
	}

	static fromObject(prodId: ProdIdType): ProdIdProperty {
		return new ProdIdProperty(`-//${prodId.company}//${prodId.platform}//${prodId.language}`);
	}

	formattedValue(): ProdIdType | null {
		if (this.fmtValue != null) return this.fmtValue;
		const prodId: string = this.value;
		console.log(prodId);
		if (prodId.startsWith('-//')) {
			let temp = prodId.substr(3).split('//');
			if (temp.length >= 3) {
				const [company, platform, language] = temp;
				this.fmtValue = { company, platform, language };
			}
		}
		return this.fmtValue;
	}
}

export class VersionProperty extends ICSProperty {
	property = PropertyName.VERSION;
	value: VersionType;

	constructor(value: VersionType) {
		super();
		this.value = value;
	}

	valueToString(): string {
		return this.value;
	}
}

export class CalScaleProperty extends ICSProperty {
	static DEFAULT_VALUE = 'GREGORIAN';
	property = PropertyName.CALSCALE;
	value: string;

	constructor(value: string = CalScaleProperty.DEFAULT_VALUE) {
		super();
		this.value = value;
	}

	valueToString(): string {
		return this.value;
	}
}

export class MethodProperty extends ICSProperty {
	// TODO Handle https://datatracker.ietf.org/doc/html/rfc5545#section-3.7.2
	property = PropertyName.METHOD;
	value: MethodType;

	constructor(value: MethodType) {
		super();
		this.value = value;
	}

	valueToString(): string {
		return this.value;
	}
}
