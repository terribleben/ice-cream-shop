import { createStore } from 'redux';

const customers = [
  'Gwendoline', 'Sigmund', 'Zed', 'Bartholomew',
  'Nestor', 'Remington', 'Harry', 'Gertrude',
  'Mildred', 'Petunia', 'Sven', 'Clementine',
  'Harold', 'Buster', 'Joe', 'Marjorie', 'Randolph',
  'Gilbert', 'Gloria', 'Lola', 'Lionel', 'Stu',
  'Betsy', 'Todd', 'Dirk', 'Bertha', 'Olga', 'Agatha',
  'Agnes', 'Gus', 'Ned',
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
  'the gluten free thing',
  'the weird floral flavor',
  'some quantity of almond topping',
  'napkins',
  'two scoops of lemon flavor',
  'orange sherbert',
  'double chocolate super cake',
  'the quadruple chocolate nightmare',
  'a frosty treat',
  'the italian chocolate variety',
  'grapefruits',
  'just a bunch of cones with no ice cream',
  'lemon sorbet with a little bit of chocolate',
  'the expensive kind',
  'a silly kids flavor',
  'diet ice cream',
  'two sundaes extra fudge',
  'more napkins',
  'no vegetables',
  'cups for water',
  'two scoops of strawberry ice cream',
  'a vanilla cup with berries',
  'an extra huge serving of peanut butter',
  'a frosty surprise',
  'a double frosty surprise',
  'a fruity frosty cone',
  'something flavored like bubble gum',
  'a french vanilla bucket',
  'a triple frosty crunch bucket',
];

const responses = [
  'son',
  'pardner',
  'bucko',
  'pal',
  'neighborino',
  'buddy',
  'you',
  'you hip cat',
  'bro',
  'bromigo',
  'duder',
  'young man',
  'fella',
  'young one',
  'bud',
  'bruh',
  'bruu',
  'boy',
  'young sir',
  'my good man',
];

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
      status: 'serving',
      cash: state.cash + action.price,
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
