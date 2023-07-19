//! This file contains code related to store
const configureStore = require('@reduxjs/toolkit').configureStore;
const cakeReducer = require('../features/cake/cakeSlice');
const iceCreamReduces = require('../features/icecream/iceCreamSlice');

const store = configureStore({
  reducer: { cake: cakeReducer, iceCream: iceCreamReduces },
});

module.exports = store;
