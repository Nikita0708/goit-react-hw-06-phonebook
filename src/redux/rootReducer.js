import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filter: '',
};

const rootReducer = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setContacts, setFilter } = rootReducer.actions;
export default rootReducer.reducer;
