import React,{useState, useEffect, useContext} from 'react';
import {SafeAreaView, TouchableOpacity, StyleSheet, Text, ScrollView, View, Button, FlatList, Image, Modal, Pressable} from 'react-native';
import {getOrderNoticeDetail} from '../Function/ApiAxios/getOrderNoticeDetail';
import UrlContext from '../Provider/UrlContext';

const OrderNoticeDetail = ({ route, navigation }) => {

  // 전 페이지 파라미터 값
  const { userPayId } = route.params;
  const {url} = useContext(UrlContext);

  // 해당 매장 주문내역 List 가져오기
  const [OrderNotice, setOrderNotice] = useState([]);
  const [OrderNoticeDetail, setOrderNoticeDetail] = useState([]); 
  useEffect(() => {
    
    getOrderNoticeDetail(userPayId,url).then((resOrderNotice) => {
      
      setOrderNotice(resOrderNotice);
      
      setOrderNoticeDetail(resOrderNotice.OrderMenu);
      
    }) 
  }, [])

  const renderItem = ({item}) =>{
    return (
      <View style={styles.menuSubView}>
        <Text>{item.MenuName}</Text>
        <View style={styles.menuOptionView}>
          <Text>{item.OptionA}/{item.OptionB}/{item.OptionC}</Text>
          <Text>{item.Price}원</Text>
        </View>
      </View>
      
    );
  }

  return (
    <SafeAreaView  style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>주문 번호 {OrderNotice.UserPayDid}</Text>
      </View>
      <View style={styles.viewContainer}>
        <View style={styles.dateView}>
          <Text style={styles.dateText}>결제완료</Text>
          <Text style={styles.dateText}>{OrderNotice.PayCompleteTime}</Text>
          <Text style={styles.dateText}>준비완료</Text>
          <Text style={styles.dateText}>{OrderNotice.MenuCompleteTime}</Text>
        </View>
        <View style={styles.menuView}>
          <FlatList
            data ={OrderNoticeDetail}
            renderItem= {renderItem}
            keyExtractor ={(item) => String(item.UserPayDid)}
          />
        </View>

        <View style={styles.priceView}>
          <Text style={styles.priceText} >{OrderNotice.PayMethod}</Text>
          <View style={styles.priceSubView}>
            <Text style={styles.priceText}>총 {OrderNoticeDetail.length}개</Text>
            <Text style={styles.priceText}>{OrderNotice.TotalPrice}원</Text>
          </View>
        </View>
        <View style={styles.buttonView}>
          <Button 
            title="주문내역으로"
            style={styles.button}
            onPress={() => 
              navigation.goBack()
            }
          />
        </View>
      </View>
    </SafeAreaView>

  )
};
const styles = StyleSheet.create({
  container : {
    flex:1
  },
  title : {
    flex:1, 
    borderWidth:1,
    alignItems:'center', 
    justifyContent:'center'
  },
  titleText : {
    fontSize:20
  },
  viewContainer : {
    flex:9, 
    padding:10
  },
  dateView : {
    flex:2, 
    borderWidth:1, 
    padding:10, 
    margin:10
  },
  dateText : {
    fontSize:15
  },
  menuView : {
    flex:5, 
    borderWidth:1, 
    padding: 10, 
    margin:10
  },
  menuSubView : {
    padding:5
  },
  menuOptionView : {
    flexDirection:'row', 
    justifyContent:'space-between'
  },
  priceView : {
    flex:1, 
    borderWidth:1, 
    padding: 10, 
    margin:10
  },
  priceSubView : {
    flexDirection:'row', 
    justifyContent:'space-between'
  },
  priceText : {
    fontSize:15
  },
  buttonView : {
    flex:1,  
    margin:10 
  },
  button : {
    fontSize:15
  }
});
export default OrderNoticeDetail;
