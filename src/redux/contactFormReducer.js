import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  number: '',
};

const contactFormReducer = createSlice({
  name: 'contactForm',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setNumber: (state, action) => {
      state.number = action.payload;
    },
  },
});

export const { setName, setNumber } = contactFormReducer.actions;
export default contactFormReducer.reducer;
