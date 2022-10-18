import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DisplayModel, getModelFromSizes, getScreenFromSizes } from '../models/DisplayModel';

//////////////////////////////////////////////////////////////////////
/////////////////////////////// SLICE ////////////////////////////////
//////////////////////////////////////////////////////////////////////

const initialState: DisplayModel = getModelFromSizes(window.innerWidth, window.innerHeight);

const name = 'display';

type ResizePayload = {
	width: number;
	height: number;
};

const slice = createSlice({
	name: name,
	initialState,
	reducers: {
		resize: (state: DisplayModel, action: PayloadAction<ResizePayload>) => getModelFromSizes(action.payload.width, action.payload.height),
	},
});

//////////////////////////////////////////////////////////////////////
////////////////////////////// EXPORT ////////////////////////////////
//////////////////////////////////////////////////////////////////////

const displaySlice = {
	slice: slice,
	actions: {
		resize: slice.actions.resize,
	},
};

export default displaySlice;
