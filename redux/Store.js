import { createStore } from 'redux';

const customers = [
  'Gwendoline', 'Sigmund', 'Zed', 'Bartholomew',
  'Nestor', 'Remington', 'Harry', 'Gertrude',
  'Mildred', 'Petunia', 'Sven', 'Clementine',
  'Harold', 'Buster', 'Joe', 'Marjorie',
];
const items = [
  'a chocolate sundae',
  'a rocky road cone',
  'a vanilla scoop',
  'a neapolitan bowl',
  'a fudge bowl',
  'a coffee',
  'a kids size amount of ice cream',
  'two flavors of something',
  'a special sundae',
  'a seasonal flavor',
  'four low fat cones',
  'an affogato',
  'some sorbet',
  'a deluxe serving',
  'some soft serve which is not available',
  'more ice cream',
  'every flavor possible',
  'two fudge bowls nested inside each other',
  'a double vanilla crunch',
  'some fruit',
  'to sample the chocolate',
];

function createRandomOrder() {
  return {
    customerName: customers[Math.floor(Math.random() * customers.length)],
    item: items[Math.floor(Math.random() * items.length)],
    price: Math.ceil(Math.random() * 5) + 0.95,
  };
}

const initialState = {
  status: 'intro',
  cash: 0,
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
    return {
      ...state,
      cash: state.cash + action.price,
      orderNumber: state.orderNumber + 1,
      order: createRandomOrder(),
    };
  case 'START':
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
