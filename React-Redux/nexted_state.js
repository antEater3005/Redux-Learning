const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const produce = require('immer').produce;

const initialState = {
  name: 'Avinash Chaurasiya',
  address: {
    street: 'B153 DivyaNagar',
    city: 'Gorakhpur',
    state: 'Uttar Pradesh',
  },
};

const STREET_UPDATED = 'STREET_UPDATED';
/* ****************STEPS**************** */

// Create Action Creators
const updateStreet = (street) => {
  return { type: STREET_UPDATED, payload: street };
};

// Create Reducers

/**
 *
 * @param {takes the initial state of the states} state
 * @param {action created} action
 * @returns state
 */

// const address = (state = initialState, action) => {
//   switch (action.type) {
//     case STREET_UPDATED:
//       return {
//         ...state,
//         address: { ...state.address, street: action.payload },
//       };

//     default:
//       return state;
//   }
// };

/* 
 ! Here there are nested states and it will become hectic to keep track of the nesting. 
 * So, to simplify this will use "Immer library"
  */
const address = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      return produce(state, (draft) => {
        draft.address.street = action.payload; // * This line same as the prev, it just simplify the things
      });

    default:
      return state;
  }
};

// ! Draft is like copy of the original immutable state we make changes in draft and the immer will compare and update the original state accordingly

// Create Store ->reducers as arguments
const store = createStore(address);

// Subscribe to the store ->store.subscribe returns the unsubscribe function

const unsubscribe = store.subscribe(() => {
  console.log('updatedState:', store.getState());
});

console.log('initialState:', store.getState());

// If required bind all action creators using bindActionCreators({actionCreators},store.dispatch) provided by redux
const actions = bindActionCreators({ updateStreet }, store.dispatch);

// Call action creators
actions.updateStreet('Awas-vikas colony');

// unsubscribe to the store
unsubscribe();
