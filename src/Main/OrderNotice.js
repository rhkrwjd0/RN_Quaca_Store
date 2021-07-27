import React,{useState, useEffect, useContext} from 'react';
import {SafeAreaView, TouchableOpacity, StyleSheet, Text, ScrollView, View, Button, FlatList, Image, Modal, Pressable} from 'react-native';
import {getOrderNotice} from '../Function/ApiAxios/getOrderNotice';

import {createStackNavigator} from '@react-navigation/stack';
import OrderNoticeDetaill from './OrderNoticeDetail';
import UserContext from '../Provider/UserContext';
import UrlContext from '../Provider/UrlContext';
const OrderNotice = ({navigation}) => {

  const {user} = useContext(UserContext);
  const {url} = useContext(UrlContext);

  // 해당 매장 주문내역 List 가져오기
  const [orderNotice, setOrderNotice] = useState([]);
  useEffect(() => {
    getOrderNotice(user.StoreId, url).then((resOrderNotice) => {
      setOrderNotice(resOrderNotice);
    }) 
  }, [])

  const renderItem = ({item}) =>{
    return (
      <TouchableOpacity style={styles.touch} 
        onPress={() => {
          navigation.navigate('OrderNoticeDetail',{
            userPayId : item.UserPayId
          });
        }}
      >
      
        <View>
          <View style={styles.stateView}>
            <Text style={styles.text}>{item.InsertDt}</Text>
            <Text style={styles.text}>
              {
              (function(){
                if(item.OrderStatus == 'OC') return '접수대기';
                else if(item.OrderStatus == 'RC') return '접수완료';
                else if(item.OrderStatus == 'PC') return '제조완료';
                else if(item.OrderStatus == 'PUC') return '픽업완료';

              })()
            }
            </Text>
          </View>
          <Text style={styles.text}>{item.NickName}</Text>
        </View>
        <View style={styles.menuView}>
          <Text style={styles.text}>{item.FirstMenuName} 
            {
              (function(){
                if(item.OrderCnt  > 1)return ' 외 '+(item.OrderCnt-1)+'개'; 
              })()
            }
            
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <FlatList
          data ={orderNotice}
          renderItem= {renderItem}
          keyExtractor ={(item) => String(item.UserPayId)}
      />
    </SafeAreaView>

  )
};

const styles = StyleSheet.create({
  container : {

  },
  touch : {
    borderWidth :1, 
    margin: 15, 
    padding:15
  },
  text : {
    fontSize : 15
  },
  stateView : {
    flexDirection : 'row', 
    justifyContent:'space-between'
  },
  menuView : {
    marginTop :10
  }
});

export default OrderNotice;
