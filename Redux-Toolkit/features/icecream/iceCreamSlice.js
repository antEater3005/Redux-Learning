const { cakeActions } = require('../cake/cakeSlice');

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
  /*
  ! This will react to all the actions not matter what the origin slice will.
  * There are two methods to create extraReducers 
   */
  // extraReducers: {
  //   ['cake/ordered']: (state) => {
  //     state.numberOfIcecreams -= 1;
  //   },
  // },

  //! This method of creating extraReducers is preferred over the former one
  extraReducers: (builder) => {
    builder.addCase(cakeActions.ordered, (state) => {
      state.numberOfIcecreams--;
    });
  },
});

module.exports = iceCreamSlice.reducer;
module.exports.iceCreamActions = iceCreamSlice.actions;
