const redux = require('redux');
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;

const createStore = redux.legacy_createStore;

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
const ICECREAM_SOLD = 'ICECREAM_SOLD';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';

// ******************* Actions *******************

// action creator are function which return action
// following functions are an action creator
function order_cake() {
  // below object is action
  return { type: CAKE_ORDERED, payload: 2 };
}

// for restocking of cakes

function restock_cakes(quantity) {
  return { type: CAKE_RESTOCKED, payload: quantity };
}
// now i want to sell ice-creams also

function sellIceCreams(quantity) {
  return { type: ICECREAM_SOLD, payload: quantity };
}

function restock_iceCreams(quantity) {
  return { type: ICECREAM_RESTOCKED, payload: quantity };
}

// ******************* REDUCER *******************

// it specify how the app's state changes according to type of action
// Reducers are pure function which takes previous-State and action as input

const initialCakeState = { numberOfCakes: 10, numberOfIcecreams: 10 };
const initialIceCreamState = { numberOfIcecreams: 10 };

const cake_reducers = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return { ...state, numberOfCakes: state.numberOfCakes - action.payload };
    case CAKE_RESTOCKED:
      return { ...state, numberOfCakes: state.numberOfCakes + action.payload };

    default:
      return state;
  }
};

const ice_cream_reducers = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICECREAM_SOLD:
      return {
        ...state,
        numberOfIcecreams: state.numberOfIcecreams - action.payload,
      };
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numberOfIcecreams: state.numberOfIcecreams + action.payload,
      };
    case CAKE_ORDERED:
      return {
        ...state,
        numberOfIcecreams: state.numberOfIcecreams - 1,
      };

    default:
      return state;
  }
};

// ******************* Store *******************
/**
 * There is only one store for the entire application in the form of Object
 * It allow access to state via getState() **only for read**
 *  It allow state to be updated using 'dispatch(action)'
 *  Register listeners via 'subscribe(listener)' ** it's executed any time the state is changed or a reducer is called
    **listener is a callback function  
    **subscribe returns a unsubscribe function

 */

//combine all reducers into a single entity
const rootReducer = combineReducers({
  cake: cake_reducers,
  iceCream: ice_cream_reducers,
});

const store = createStore(rootReducer);

console.log('initialState', store.getState());

// called every time the state changes
const unsubscribe = store.subscribe(() => {
  console.log('update State:', store.getState());
});

const cake_actions = bindActionCreators(
  { order_cake, restock_cakes },
  store.dispatch
);
const ice_cream_actions = bindActionCreators(
  { sellIceCreams, restock_iceCreams },
  store.dispatch
);

// dispatch actions ** we should always use action creator instead of pure action
cake_actions.order_cake();
cake_actions.order_cake();
cake_actions.restock_cakes(5);
ice_cream_actions.sellIceCreams(3);
cake_actions.order_cake();

unsubscribe();
