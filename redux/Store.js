import { createStore } from 'redux';
import Data from './Data';
let { customers, items, responses, levelThresholds } = Data;

function createRandomOrder() {
  return {
    customerName: customers[Math.floor(Math.random() * customers.length)],
    item: items[Math.floor(Math.random() * items.length)],
    price: Math.ceil(Math.random() * 5) + 0.95,
    response: 'Good job ' + responses[Math.floor(Math.random() * responses.length)],
  };
}

const initialState = {
  status: 'intro',
  cash: 0,
  level: 0,
  orderNumber: 0,
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
    const nextCash = state.cash + action.price;
    let nextLevel = state.level;
    if (state.level < levelThresholds.length
        && nextCash >= levelThresholds[state.level]) {
      nextLevel++;
    }
    return {
      ...state,
      status: 'serving',
      cash: nextCash,
      level: nextLevel,
      orderNumber: state.orderNumber + 1,
      order: createRandomOrder(),
    };
  case 'START': case 'FINISH_ORDER':
    return {
      ...state,
      status: 'started',
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
