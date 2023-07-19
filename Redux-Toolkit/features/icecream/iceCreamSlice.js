const createSlice = require('@reduxjs/toolkit').createSlice;

const initialState = {
  numberOfIcecreams: 10,
};

const iceCreamSlice = createSlice({
  name: 'iceCream',
  initialState,
  reducers: {
    ordered: (state, action) => {
      state.numberOfIcecreams -= action.payload;
    },
    restocked: (state, action) => {
      state.numberOfIcecreams += action.payload;
    },
  },
});

module.exports = iceCreamSlice.reducer;
module.exports.iceCreamActions = iceCreamSlice.actions;
