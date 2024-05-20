import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    token: null,
    email: null,
    firstname: null,
    lastname: null,
    city: null,
    role: null,
    profilAnimal: [],
    avis: [],
    historique: [],
    like: [],
    likeReceived: []
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.email = action.payload.email;
      state.value.firstname = action.payload.firstname;
      state.value.lastname = action.payload.lastname;
      state.value.city = action.payload.city;
      state.value.role = action.payload.role;
      state.value.profilAnimal.push(action.payload);
      state.value.avis.push(action.payload);
      state.value.historique.push(action.payload);
      state.value.like.push(action.payload);
      state.value.likeReceived.push(action.payload);
    },
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
    }
  }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
