import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: [],
};

export const favoriteSlice = createSlice({
	name: 'favorite',
	initialState,
	reducers: {
		addBurger: (state, action) => {
			state.value.push(action.payload);
		},
		removeBurger: (state, action) => {
			state.value = state.value.filter(bookmark => bookmark.title !== action.payload.title);
		},
		removeAllBurgers: (state) => {
			state.value = [];
		},
	},
});

export const { addBurger, removeBurger, removeAllBurgers } = favoriteSlice.actions;
export default favoriteSlice.reducer;