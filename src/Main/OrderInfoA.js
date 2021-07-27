import React,{useState, useEffect, useContext} from 'react';
import {SafeAreaView, StyleSheet, Text, ScrollView, View, Button, FlatList, Image, Modal, Pressable} from 'react-native';
import {getOrderInfoA} from '../Function/ApiAxios/getOrderInfoA';
import {getOrderStateRC} from '../Function/ApiAxios/getOrderStateRC';
import {getOrderStatePC} from '../Function/ApiAxios/getOrderStatePC';
import {getOrderNoticePc} from '../Function/ApiAxios/getOrderNoticePc';

import UserContext from '../Provider/UserContext';
import UrlContext from '../Provider/UrlContext';

const OrderInfoA = ({navigation, route}) => {
  // navigator 에서 파라미터로 보낸 카테고리받아서 화면에 보여주기
  var orderState = route.params.orderState;

  const {user} = useContext(UserContext);
  const {url} = useContext(UrlContext);

  const [change, setChange] = useState(false)
  // 해당 매장 메뉴 List 가져오기
  const [orderInfoAData, setOrderInfoAData] = useState([]);
  useEffect(() => {
    getOrderInfoA(user.StoreId, url).then((resOrderInfoA) => {
      
      if(resOrderInfoA.success){
        setOrderInfoAData(resOrderInfoA.info);
      }else{
        setOrderInfoAData([]);
      }
    }) 
  }, [change])

  const renderItem = ({item}) =>{
    return (
      <View style={styles.viewContainer}>
        <View>
          <Text style={styles.text}>주문 시간 : {item.InsertDt}</Text>
          <Text style={styles.text}>{item.NickName}</Text>
        </View>
        <View style={styles.menuView}>
          {
            item.OrderMenu.length > 0 ? (
              item.OrderMenu.map((e, index) =>(
                <Text style={styles.text} key={e.UserPayDid}>{e.MenuName}({e.OptionB}/{e.OptionA}) 1개</Text>
              ))
            ) : (
              false
            )
          }
        </View>
        <View >
          <View style={styles.buttonContainer}>
            
            <View style={styles.buttonView1}>
              <Button 
                disabled={
                  (function(){
                    if(item.OrderStatus == 'RC') return false
                    else if(item.OrderStatus == 'PC') return true
                  })()
                }
                style={styles.button} title="제조완료" 
                onPress={() => {
                  
                  getOrderStateRC(user.StoreId, item.UserPayId, url)
                  .then((resOrderState)=>{
                    console.log("!@!@!@",resOrderState)
                    var msg = "실패했습니다.";
                    if(resOrderState.success){
                      msg = "성공했습니다.";
                      setChange(!change)
                      alert(msg);
                      // 알람 처리 
                      getOrderNoticePc(item.UserPayId, url)
                      .then((resOrderNoticePc)=>{
                        console.log(resOrderNoticePc.success)
                      });
                    }else{
                      alert(msg);
                    }
                  });
                }}
              />
            </View>
            <View style={styles.buttonView2}>
              <Button 
                disabled={
                  (function(){
                    if(item.OrderStatus == 'RC') return true
                    else if(item.OrderStatus == 'PC') return false
                  })()
                }
                style={styles.button} title="픽업완료" 
                onPress={() => {
                  
                  getOrderStatePC(user.StoreId, item.UserPayId, url)
                  .then((resOrderState)=>{
                    var msg = "실패했습니다.";
                    if(resOrderState.success){
                      msg = "성공했습니다.";
                      setChange(!change)
                      alert(msg);
                    }else{
                      alert(msg);
                    }
                  });
                }}
              />
            </View>
          </View>
          
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView  style={styles.container}>
      {/* <Text>접수 전1 : {orderState}</Text> */}
      <FlatList
          data ={orderInfoAData}
          renderItem= {renderItem}
          keyExtractor ={(item) => String(item.UserPayId)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container : {

  },
  viewContainer : {
    borderWidth :1, 
    margin: 15, 
    padding:15
  },
  text : {
    fontSize : 15
  },
  menuView : {
    marginTop :10
  },
  buttonContainer : {
    flexDirection:"row",
    paddingTop:20, 
    justifyContent:'center'
  },
  buttonView1 : {
    justifyContent:'center', 
    width:'47%', 
    marginRight:10
  },
  buttonView2 : {
    justifyContent:'center', 
    width:'47%'
  },
  button : {
    flex:1
  }

});

export default OrderInfoA;
