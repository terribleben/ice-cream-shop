import { createStore } from 'redux';

const customers = ['Alice', 'Bob', 'Ernesto'];
const items = ['rocky road', 'mint chip'];
const prices = [1.95, 2.95, 3.95];

function createRandomOrder() {
  return {
    customerName: customers[Math.floor(Math.random() * customers.length)],
    item: items[Math.floor(Math.random() * items.length)],
    price: prices[Math.floor(Math.random() * prices.length)],
  };
}

const initialState = {
  status: 'started',
  cash: 0,
  order: createRandomOrder(),
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
      order: createRandomOrder(),
    };
  case 'RESTART':
    let blankState = initialState;
    blankState.order = createRandomOrder();
    return blankState;
  default:
    return state;
  }
};

export default createStore(reduce, initialState);
