export const enum CalendarTypes {
	single = 'single',
	multiple = 'multiple',
}

export class ICSFile {
	type: CalendarTypes;
	private readonly firstCalendar: ICSFile;
	private readonly otherCalendars: ICSFile[] = [];

	private constructor(firstCalendar: ICSFile, otherCalendars: ICSFile[] = []) {
		this.firstCalendar = firstCalendar;
		this.type = CalendarTypes.single;
		if (otherCalendars) {
			this.otherCalendars = otherCalendars;
			this.type = CalendarTypes.multiple;
		}
	}

	addCalendar(...calendars: ICSFile[]): void {
		this.otherCalendars.push(...calendars);
	}

	getCalendar(): ICSFile | ICSFile[] {
		switch (this.type) {
			case CalendarTypes.single:
				return this.firstCalendar;
			case CalendarTypes.multiple:
				return [this.firstCalendar, ...this.otherCalendars];
		}
	}

	/***********   EXPORT   **********/

	toICS(): string {
		return this.firstCalendar.toICS() + this.otherCalendars.map((c) => c.toICS()).join('');
	}
}
