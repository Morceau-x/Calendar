//////////////////////////////////////////////////////////////////////
/////////////////////////////// TYPE /////////////////////////////////
//////////////////////////////////////////////////////////////////////

export const enum DisplayStyles {
	Mobile = 'mobile',
	MediumScreen = 'medium_screen',
	LargeScreen = 'large_screen',
	ExtraLargeScreen = 'extra_large_screen',
}

export const Mobile = {
	type: DisplayStyles.Mobile,
};

export type MobileType = typeof Mobile;

export const MediumScreen = {
	type: DisplayStyles.MediumScreen,
};

export type MediumScreenType = typeof MediumScreen;

export const LargeScreen = {
	type: DisplayStyles.LargeScreen,
};

export type LargeScreenType = typeof LargeScreen;

export const ExtraLargeScreen = {
	type: DisplayStyles.ExtraLargeScreen,
};

export type ExtraLargeScreenType = typeof ExtraLargeScreen;

export type DisplayStyleType = MobileType | MediumScreenType | LargeScreenType | ExtraLargeScreenType;
export type DisplayModel = {
	displayStyle: DisplayStyleType;
	width: number;
	height: number;
};

//////////////////////////////////////////////////////////////////////
////////////////////////////// HELPERS ///////////////////////////////
//////////////////////////////////////////////////////////////////////

export const getScreenFromSizes = (width: number, height: number): DisplayStyleType => {
	if (height > width) return Mobile;
	else if (width < 800) return MediumScreen;
	else if (width < 1200) return LargeScreen;
	else return ExtraLargeScreen;
};

export const getModelFromSizes = (width: number, height: number): DisplayModel => ({
	displayStyle: getScreenFromSizes(width, height),
	width: width,
	height: height,
});
