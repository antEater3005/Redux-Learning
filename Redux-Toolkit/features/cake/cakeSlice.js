//! The entire application state is sliced into parts called 'Slice' that are managed individually.

const createSlice = require('@reduxjs/toolkit').createSlice;

const initialState = {
  numberOfCakes: 10,
};

//! The createSlice will create actions by itself by the name we created the reducers

const cakeSlice = createSlice({
  name: 'cake',
  // initialState:initialState,
  initialState, // since the key and value name are same
  reducers: {
    ordered: (state, action) => {
      state.numberOfCakes -= action.payload; // the redux toolkit uses 'Immer' library under the hood to make changes to a immutable state
    },
    restocked: (state, action) => {
      state.numberOfCakes += action.payload;
    },
  },
});

module.exports = cakeSlice.reducer; // default export
module.exports.cakeActions = cakeSlice.actions; // named export
