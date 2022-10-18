enum Unit {
	PCT = '%',
	PXL = 'px',
	VH = 'vh',
	VW = 'vw',
}

enum Operation {
	MIN = 'min',
	MAX = 'max',
	CLAMP = 'clamp',
	CALC = 'calc',
}

type AnyValue = CssValue | number;
type Value = { value: number; unit: Unit } | number;
type CalcValue =
	| Value
	| {
			operation: Operation.MAX | Operation.MIN;
			value1: AnyValue;
			value2: AnyValue;
	  }
	| {
			operation: Operation.CALC;
			value1: AnyValue;
			value2: AnyValue;
			operator: string;
	  }
	| {
			operation: Operation.CLAMP;
			value1: AnyValue;
			value2: AnyValue;
			value3: AnyValue;
	  };

export default class CssValue {
	value: CalcValue;

	private constructor(value: CalcValue, unit?: Unit) {
		if (unit && typeof value == 'number') {
			this.value = { value, unit };
		} else if (unit && typeof value != 'number') {
			this.value = 0;
		} else {
			this.value = value;
		}
	}

	static pct = (value: number): CssValue => new CssValue(value, Unit.PCT);
	static pxl = (value: number): CssValue => new CssValue(value, Unit.PXL);
	static vh = (value: number): CssValue => new CssValue(value, Unit.VH);
	static vw = (value: number): CssValue => new CssValue(value, Unit.VW);
	static min = (a: AnyValue, b: AnyValue): CssValue => new CssValue({ operation: Operation.MIN, value1: a, value2: b });
	static max = (a: AnyValue, b: AnyValue): CssValue => new CssValue({ operation: Operation.MAX, value1: a, value2: b });
	static clamp = (a: AnyValue, b: AnyValue, c: AnyValue): CssValue => new CssValue({ operation: Operation.CLAMP, value1: a, value2: b, value3: c });
	static add = (a: AnyValue, b: AnyValue): CssValue => new CssValue({ operation: Operation.CALC, value1: a, value2: b, operator: '+' });
	static sub = (a: AnyValue, b: AnyValue): CssValue => new CssValue({ operation: Operation.CALC, value1: a, value2: b, operator: '-' });
	static mult = (a: AnyValue, b: AnyValue): CssValue => new CssValue({ operation: Operation.CALC, value1: a, value2: b, operator: '*' });
	static div = (a: AnyValue, b: AnyValue): CssValue => new CssValue({ operation: Operation.CALC, value1: a, value2: b, operator: '/' });

	toCss = (): string => {
		if (typeof this.value == 'number') {
			return `${this.value}`;
		} else if ('unit' in this.value) {
			return `${this.value.value}${this.value.unit}`;
		} else if (this.value.operation == Operation.CLAMP) {
			return `${this.value.operation}(${CssValue.valueToCss(this.value.value1)},${CssValue.valueToCss(this.value.value2)},${CssValue.valueToCss(
				this.value.value3
			)})`;
		} else if (this.value.operation == Operation.CALC) {
			return `${this.value.operation}(${CssValue.valueToCss(this.value.value1)} ${this.value.operator} ${CssValue.valueToCss(this.value.value2)})`;
		} else {
			return `${this.value.operation}(${CssValue.valueToCss(this.value.value1)},${CssValue.valueToCss(this.value.value2)})`;
		}
	};

	toString(): string {
		return this.toCss();
	}
	private static valueToCss(v: AnyValue) {
		if (typeof v == 'number') return `${v}`;
		else return v.toCss();
	}
}
