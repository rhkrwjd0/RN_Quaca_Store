import {createContext} from 'react';

const OrderContext = createContext({
  orderState: '',
  setOrderState: () => {},
});

export default OrderContext;
