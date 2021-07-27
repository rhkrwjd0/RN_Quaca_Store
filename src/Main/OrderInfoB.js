import React,{useState, useEffect, useContext} from 'react';
import {SafeAreaView, StyleSheet, Text, ScrollView, View, Button, FlatList, Image, Modal, Pressable, RefreshControl} from 'react-native';
import {getOrderInfoB} from '../Function/ApiAxios/getOrderInfoB';
import {getOrderStateOC} from '../Function/ApiAxios/getOrderStateOC';
import {getOrderNoticeRc} from '../Function/ApiAxios/getOrderNoticeRc';

import UserContext from '../Provider/UserContext';
import UrlContext from '../Provider/UrlContext';


const OrderInfoB = ({navigation, route}) => {

  const {user} = useContext(UserContext);
  const {url} = useContext(UrlContext);
  // navigator 에서 파라미터로 보낸 카테고리받아서 화면에 보여주기
  //var orderState = route.params.orderState;

  const [change, setChange] = useState(false)
  // 해당 매장 메뉴 List 가져오기
  const [orderInfoBData, setOrderInfoBData] = useState([]);
  useEffect(() => {
    getOrderInfoB(user.StoreId, url).then((resOrderInfoB) => {
      //setOrderInfoBData(resOrderInfoB);
      if(resOrderInfoB.success){
        console.log(resOrderInfoB.info)
        setOrderInfoBData(resOrderInfoB.info);
      }else{
        setOrderInfoBData([]);
      }
    }) 
  }, [change])

  const [time, setTime] = useState('곧');
  

  const renderItem = ({item}) =>{
    return (
      <View style={styles.viewContainer}>
        <View>
          <Text style={styles.text}>주문 시간 : {item.InsertDt}</Text>
          <Text style={styles.text}>{item.NickName}</Text>
        </View>
        <View style={styles.menuView}>
              {
                item.OrderMenu.length > 0 ?
                (
                  item.OrderMenu.map((e, index) =>(
                    <Text style={styles.text} key={e.UserPayDid}>{e.MenuName}({e.OptionB}/{e.OptionA}) 1개</Text>
                  ))
                ) : 
                (
                  false
                )
              }
          
        </View>
        <View >
          <View style={styles.timeButtonContainer1}>
            <View style={styles.timeButtonView1}>
              <Button style={styles.timeButton} title="곧" 
                onPress={() => {
                  
                  setTime('곧')
                }}
              />
            </View>
            <View style={styles.timeButtonView2}>
              <Button style={styles.timeButton} title="5분" 
                onPress={() => {
                  
                  setTime('5분')
                }}
              />
            </View>
          </View>
          <View style={styles.timeButtonContainer2}>
            <View style={styles.timeButtonView1}>
              <Button style={styles.timeButton} title="10분" 
                onPress={() => {
                  
                  setTime('10분')
                }}
              />
            </View>
            <View style={styles.timeButtonView2}>
              <Button style={styles.timeButton} title="20분" 
                onPress={() => {
                  
                  setTime('20분')
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.orderButtonView}>
            <Button title="주문접수" onPress={() => {
              getOrderStateOC(user.StoreId,item.UserPayId, url)
              .then((resOrderState)=>{
                console.log("----------------------------",resOrderState)
                var msg = "실패했습니다.";
                if(resOrderState.success){
                  msg = "성공했습니다.";
                  setChange(!change);
                  alert(msg);
                  navigation.replace('OrderInfo');
                  //console.log("========================================",resOrderState.info.UserPayId, time, url)
                  // 알람 처리 
                  getOrderNoticeRc(item.UserPayId, time, url)
                  .then((resOrderNoticeRc)=>{
                    console.log(resOrderNoticeRc.success)
                  });

                }else{
                  alert(msg);
                }
              });
          }}/>
          </View>
      </View>
    );
  }


  return (
    <SafeAreaView  style={styles.container}>
      
      <FlatList
          data ={orderInfoBData}
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
  timeButtonContainer1:{
    flexDirection:"row",
    paddingTop:20,
    justifyContent:'center'
  },
  timeButtonContainer2:{
    flexDirection:"row",
    paddingTop:5,  
    justifyContent:'center'
  },
  timeButtonView1 : {
    justifyContent:'center', 
    width:'47%', 
    marginRight:10
  },
  timeButtonView2 : {
    justifyContent:'center', 
    width:'47%'
  },
  timeButton : {
    flex:1
  },
  orderButtonView : {
    paddingTop:5
  }
})
export default OrderInfoB;
