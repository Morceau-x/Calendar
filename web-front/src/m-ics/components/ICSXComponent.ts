import { ICSProperty } from '../model/ICSProperties';
import { ICSComponent } from './ICSComponent';

export class ICSXComponent extends ICSComponent {
	protected readonly componentName: string;
	private readonly properties: ICSProperty[];
	private readonly components: ICSComponent[] = [];

	private constructor(name: string | { name: string; vendor: string }, properties: ICSProperty[] = [], components: ICSComponent[] = []) {
		super();
		if (typeof name == 'string') this.componentName = `X-${name}`;
		else this.componentName = `X-${name.vendor}-${name.name}`;
		this.properties = properties;
		this.components = components;
	}

	getComponents(): ICSComponent[] {
		return this.components;
	}

	getProperties(): ICSProperty[] {
		return this.properties;
	}
}
