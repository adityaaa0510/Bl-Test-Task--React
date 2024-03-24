// counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    casesdata: [],
    deathdata:[],
    recovereddata:[], 
    updatecase:[],
  },

  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
    setCasesdata: (state, action) => {
      state.casesdata = action.payload;
    },
      setDeathdata: (state, action) => {
      state.deathdata = action.payload;
    },
       setRecovereddata: (state, action) => {
      state.recovereddata = action.payload;
    },
      setUpdatecase: (state, action) => {
      state.updatecase = action.payload;
    },
    
    
  
  },
});

export const { increment, decrement, incrementByAmount, setCasesdata,setDeathdata,setRecovereddata,setUpdatecase} = counterSlice.actions;

export default counterSlice.reducer;
