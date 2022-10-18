import React, { useState } from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { ThemeModel } from '../../models/ThemeModel';
import { Style } from '../../utils/Style/JssUtils';
import { daysInWeek, daysLongNames } from '../../utils/CalendarUtils';
import { localesNames, supportedLocales, useAppTranslation } from '../../utils/intl/I18nOptions';
import { useAppDispatch } from '../../state/Store';

/**
 * Component props
 */
type CalendarSettingsProps = {
	// Empty
};

/**
 * CalendarSettings
 * React Functional Component
 *
 * @param props
 */
export const CalendarSettings: React.VFC<CalendarSettingsProps> = (props: CalendarSettingsProps) => {
	const theme = useTheme<ThemeModel>();
	const classes = createUseStyles(styles)({ theme });
	const dispatch = useAppDispatch();
	const { i18n } = useAppTranslation();
	const [firstDayOfWeek, setFirstDayOfWeek] = useState<number>(0);

	return (
		<div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-evenly' }}>
			<div>
				<select name="weekdays" id="pet-select" onChange={(e) => setFirstDayOfWeek(parseInt(e.target.value))}>
					{[...Array(daysInWeek).keys()].map((day) => {
						const dayStr = daysLongNames(i18n.language)[day];
						return (
							<option key={day} value={`${day}`}>
								{dayStr}
							</option>
						);
					})}
				</select>
			</div>
			<div style={{ display: 'flex', alignItems: 'baseline' }}>
				<select defaultValue={i18n.language} name="language" id="pet-select" onChange={(e) => i18n.changeLanguage(e.target.value)}>
					{supportedLocales.map((locale) => {
						const localeName = localesNames[locale];
						return (
							<option key={locale} value={`${locale}`}>
								{localeName}
							</option>
						);
					})}
				</select>
			</div>
		</div>
	);
};

const root: Style<CalendarSettingsProps, ThemeModel> = {};

const styles = (theme: ThemeModel) => ({
	root: root,
});
