import React,{useState, useEffect, useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet, Button} from 'react-native';

import Login from '../Home/Login';
import Main from '../Home/Main';
import StoreInfo from '../Main/StoreInfo';
import StoreInfoUpdate from '../Main/StoreInfoUpdate';
import MenuTopNavi from './MenuTopNavi';
import MenuInfoInsert from '../Main/MenuInfoInsert';
import MenuInfoUpdate from '../Main/MenuInfoUpdate';
import OrderInfoTopNavi from './OrderInfoTopNavi';
import OrderNotice from '../Main/OrderNotice';
import OrderNoticeDetail from '../Main/OrderNoticeDetail';
import UserContext from '../Provider/UserContext';

import WebView from '../Main/WebView';

const Stack = createStackNavigator();

function HomeStack({navigation, route}) {
  
  const {user} = useContext(UserContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Login"
        component={Login}
      />
      <Stack.Screen options={{title: 'QUACA'}} name="Main" component={Main} />
      <Stack.Screen
        initialParams ={{
          changeCk : 0
        }}
        name="StoreInfo"
        component={StoreInfo}
        options={({navigation, route }) => ({
          title: '매장정보',
          headerRight: () => (
            <Button
              title="수정"
              onPress={() => {
                navigation.navigate('StoreInfoUpdate',{
                  storeId : user.StoreId
                }
                );
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="MenuInfo"
        component={MenuTopNavi}
        options={({navigation, route }) => ({
          title: '메뉴정보',
          headerRight: () => (
            <Button
              title="추가"
              onPress={() => {
                navigation.navigate('MenuInfoInsert',{
                  storeId : user.StoreId,
                });
              }}
            />
          ),
        })}
      />

      <Stack.Screen
        options={{title: '메뉴정보'}}
        name="MenuInfoInsert"
        component={MenuInfoInsert}
      />
      <Stack.Screen
        options={{title: '메뉴정보'}}
        name="MenuInfoUpdate"
        component={MenuInfoUpdate}
      />

      <Stack.Screen
        options={{title: '매장정보'}}
        name="StoreInfoUpdate"
        component={StoreInfoUpdate}
      />
     <Stack.Screen
        options={{title: '접수내역'}}
        name="OrderInfo"
        component={OrderInfoTopNavi}
      />
      <Stack.Screen
        name="OrderNotice"
        component={OrderNotice}
        options={{title: '주문내역'}}
      />
     <Stack.Screen
        name="OrderNoticeDetail"
        component={OrderNoticeDetail}
        options={{title: '주문상세'}}
      />
      <Stack.Screen
        name="WebView"
        component={WebView}
        options={{title: '웹뷰'}}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;
