import { ICSComponent } from './ICSComponent';
import { CalScaleProperty, ICSProperty, MethodProperty, ProdIdProperty, VersionProperty } from '../model/ICSProperties';

type ICSCalendarProperties = {
	prodId: ProdIdProperty;
	version: VersionProperty;
	calScale?: CalScaleProperty;
	method?: MethodProperty;
	xProperties?: ICSProperty[];
};

export class ICSCalendar extends ICSComponent {
	protected readonly componentName = 'VCALENDAR';
	// Properties
	readonly prodId: ProdIdProperty;
	readonly version: VersionProperty;
	readonly calScale: CalScaleProperty;
	readonly method: MethodProperty | null;
	private readonly xProperties: ICSProperty[];

	// Components
	private readonly firstComponent: ICSComponent;
	private readonly otherComponents: ICSComponent[] = [];

	private constructor(properties: ICSCalendarProperties, firstComponent: ICSComponent, otherComponents: ICSComponent[] = []) {
		super();
		this.prodId = properties.prodId;
		this.version = properties.version;
		this.calScale = properties.calScale ?? new CalScaleProperty();
		this.method = properties.method ?? null;
		this.xProperties = properties.xProperties ?? [];
		this.firstComponent = firstComponent;
		this.otherComponents = otherComponents;
	}

	getComponents(): ICSComponent[] {
		return [this.firstComponent, ...this.otherComponents];
	}

	getProperties(): ICSProperty[] {
		const properties = [this.prodId, this.version, this.calScale];
		if (this.method) properties.push(this.method);
		return [...properties, ...this.xProperties];
	}
}
