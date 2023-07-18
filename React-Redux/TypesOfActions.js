/**
 * There are two types of actions
 * ! Synchronous Actions : As soon as the action dispatched the state is updated
 * ! Asynchronous Actions : This types of actions include API call to fetch data from some endpoints to use that data in our application
 *
 */

const { default: axios } = require('axios');
const redux = require('redux');
const reduxLogger = require('redux-logger');
const thunkMiddleware = require('redux-thunk').default;

const bindActionCreators = redux.bindActionCreators;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();
const createStore = redux.createStore;

//* Async Actions example

const initialState = {
  loading: false,
  users: [],
  error: '',
};

//! Actions
const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED';
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED';
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';

const fetchUserRequest = () => {
  return { type: FETCH_USERS_REQUESTED };
};

const fetchUserSuccess = (users = []) => {
  return { type: FETCH_USERS_SUCCEEDED, payload: users };
};

const fetchUserFailed = (error = '') => {
  return { type: FETCH_USERS_FAILED, payload: error };
};

//! Reducers
const reducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return { ...state, loading: true };
    case FETCH_USERS_SUCCEEDED:
      return {
        ...state,
        loading: false,
        users: [...state.users, ...action.payload],
      };
    case FETCH_USERS_FAILED:
      return { ...state, loading: false, error: action.payload, users: [] };
    default:
      return state;
  }
};

//! Create Store
const store = createStore(reducers, applyMiddleware(thunkMiddleware, logger));

//! Subscribe to store (NOTE:it returns unsubscribe function)
const unsubscribe = store.subscribe(() => {});

//! Bind Actions with store
const actions = bindActionCreators(
  {
    fetchUserRequest,
    fetchUserFailed,
    fetchUserSuccess,
  },
  store.dispatch
);

//* Thunk middleware provide capability to dispatch actionCreators which can also return function which can have side-effects such as API call and other asynchronous task;

//! Async API request
const fetchUser = () => {
  return function (dispatch) {
    actions.fetchUserRequest();
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        const users = res.data.map((user) => user.id);
        actions.fetchUserSuccess(users);
      })
      .catch((error) => {
        actions.fetchUserFailed(error.message);
        // console.log(error.message);
      });
  };
};

store.dispatch(fetchUser());

//! Call actions Creators
// actions.fetchUserRequest();
// actions.fetchUserSuccess(['Tsubaki', 'Urabe']);
// actions.fetchUserFailed('ERROR:500 Server not found!');
// actions.fetchUserSuccess(['Mikoto', 'Akira']);

//! unsubscribe to the store
unsubscribe();
