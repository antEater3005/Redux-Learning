/**
 ** Plain Redux requires too much boilerplate code. like for each type of action we have to write different code
 *
 *? Redux toolkit is the official, opinionated, batteries-included toolset for efficient Redux development
 ** like abstract over setup process, handling the most common use cases, and includes some useful utilities.
 *! We develop the same cake shop example in the index.js file using Redux-Toolkit library
 */

const store = require('./app/store');
const cakeActions = require('./features/cake/cakeSlice').cakeActions; //! named import
const { iceCreamActions } = require('./features/icecream/iceCreamSlice'); //! also a named import

// console.log('initialState: ', store.getState());

const unsubscribe = store.subscribe(() => {});

store.dispatch(cakeActions.ordered(3));
store.dispatch(cakeActions.restocked(3));
store.dispatch(cakeActions.restocked(4));

store.dispatch(iceCreamActions.ordered(4));
store.dispatch(iceCreamActions.restocked(6));

unsubscribe();
