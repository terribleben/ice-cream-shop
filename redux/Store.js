import { createStore } from 'redux';

const initialState = {
  status: 'started',
};

const reduce = (state, action) => {
  switch (action.type) {
  case 'UPDATE_STATUS':
    return {
      ...state,
      status: action.status,
    }
  default:
    return state;
  }
};

export default createStore(reduce, initialState);
