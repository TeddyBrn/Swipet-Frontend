import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    token: null,
    email: null,
    firstname: null,
    bio: null,
    city: null,
    role: null,
    age: null,
    photo: null,
    profilAnimal: [],
    avis: [],
    historique: [],
    like: [],
    likeReceived: []
  }
};

const userSlice = createSlice({
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
      state.value.age = action.payload.age;
      state.value.photo = action.payload.photo;
      state.value.bio = action.payload.bio;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.email = null;
      state.value.firstname = null;
      state.value.lastname = null;
      state.value.city = null;
      state.value.role = null;
      state.value.age = null;
      state.value.photo = null;
      state.value.bio = null;
      state.value.profilAnimal = [];
      state.value.avis = [];
      state.value.like = [];
      state.value.likeReceived = [];
    }
  ,
  addAnimal: (state, action) => {
    state.value.profilAnimal.push(action.payload)
  }  ,
  addLike: (state, action) => {
    state.value.like.push(action.payload);
  }
  }
});

export const { login, logout, addAnimal, addLike } = userSlice.actions;
export default userSlice.reducer;
