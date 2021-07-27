import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import MenuInfo from '../Main/MenuInfo';

const Tab = createMaterialTopTabNavigator();

const MenuTopNavi = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="drink"
        component={MenuInfo}
        initialParams={{category: 'drink', changeData : 0}}
        options={{
          title:"음료"
        }}
      />
      <Tab.Screen
        name="bread"
        component={MenuInfo}
        initialParams={{category: 'bread', changeData : 0}}
        options={{
          title:"베이커리"
        }}
      />
      <Tab.Screen
        name="goods"
        component={MenuInfo}
        initialParams={{category: 'goods', changeData : 0}}
        options={{
          title:"상품"
        }}
      />
      
    </Tab.Navigator>
  );
};

export default MenuTopNavi;
