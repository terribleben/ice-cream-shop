import { createStore } from 'redux';

const initialState = {
  status: 'started',
  cash: 0,
};

const reduce = (state, action) => {
  switch (action.type) {
  case 'PUNCH_IN_FACE':
    return {
      ...state,
      status: 'over',
    };
  case 'SERVE_ORDER':
    return {
      ...state,
      cash: state.cash + action.price,
    };
  case 'RESTART':
    return initialState;
  default:
    return state;
  }
};

export default createStore(reduce, initialState);
