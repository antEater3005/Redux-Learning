//! This file contains code related to store
const configureStore = require('@reduxjs/toolkit').configureStore;
const cakeReducer = require('../features/cake/cakeSlice');
const iceCreamReduces = require('../features/icecream/iceCreamSlice');
const userReducer = require('../features/user/userSlice');

const reduxLogger = require('redux-logger');

const logger = reduxLogger.createLogger();

const store = configureStore({
  reducer: { cake: cakeReducer, iceCream: iceCreamReduces, user: userReducer },
  //! we have some default middleware, so we get them and concat our logger in that list
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(logger);
  },
});

module.exports = store;
