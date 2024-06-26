import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    userId: null,
    petsitterId: null,
    messages: [],
    proposal: [],
    name: null
  }
};

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    addMatch: (state, action) => {
      state.value.userId = action.payload.token;
      state.value.petsitterId = action.payload._id;
      // matchId
    },
    addName: (state, action) => {
    state.value.name = action.payload.name
    },
    addMessage: (state, action) => {
    state.value.messages.push(action.payload)
    },
    removeMessage: (state, action) => {
    state.value.messages.pull(action.payload)
    },
    addProposal: (state, action) => {
    state.value.proposal.push(action.payload);
    },
    removeProposal: (state, action) => {
    state.value.proposal.pull(action.payload);
    },
 }
});

export const { addMatch, addMessage, removeMessage, addProposal, removeProposal,addName } = matchSlice.actions;
export default matchSlice.reducer;