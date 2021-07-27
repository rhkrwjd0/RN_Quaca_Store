import React, {useState} from 'react';
import OrderContext from './OrderContext';

const OrderProvider = ({children}) => {
  const setOrderState = (props) => {
    setText((prevState) => {
      return {
        ...prevState,
        orderState: props.orderState,
      };
    });
  };
  const initialState = {
    orderState: '',
    setOrderState,
  };

  const [text, setText] = useState(initialState);
  return <OrderContext.Provider value={text}>{children}</OrderContext.Provider>;
};

export default OrderProvider;
