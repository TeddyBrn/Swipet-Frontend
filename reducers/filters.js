import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    distance: 2,
    ageMin: 18,
    ageMax: 95,
    noteMin: 1,
    time: 1,
  }
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {

    addDistance: (state, action) => {
    state.value.distance = action.payload;
    },
    addAgeMin: (state, action) => {
    state.value.ageMin = action.payload;
    },
    addAgeMax: (state, action) => {
    state.value.ageMax = action.payload;
    },
    addNoteMin: (state, action) => {
        state.value.noteMin = action.payload;
        },
    addTime: (state, action) => {
    state.value.time = action.payload;
    },
 }
});

export const { addDistance, addAgeMin, addAgeMax, addTime, addNoteMin } = filterSlice.actions;
export default filterSlice.reducer;