import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import OrderInfoA from '../Main/OrderInfoA';
import OrderInfoB from '../Main/OrderInfoB';

const Tab = createMaterialTopTabNavigator();

const OrderInfoTopNav = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="OrderInfoB"
        component={OrderInfoB}
        options={{title: '접수 전'}}
        initialParams={{orderState: 'before'}}
        
      />
      <Tab.Screen
        name="OrderInfoA"
        component={OrderInfoA}
        options={{title: '접수 후'}}
        initialParams={{orderState: 'after'}}
        
      />
    </Tab.Navigator>
  );
};

export default OrderInfoTopNav;
