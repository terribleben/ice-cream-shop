import { createStore } from 'redux';

const initialState = {
  status: 'started',
  cash: 0,
};

const reduce = (state, action) => {
  switch (action.type) {
  case 'UPDATE_STATUS':
    return {
      ...state,
      status: action.status,
    };
  case 'SERVE_ORDER':
    return {
      ...state,
      cash: state.cash + action.price,
    };
  default:
    return state;
  }
};

export default createStore(reduce, initialState);
