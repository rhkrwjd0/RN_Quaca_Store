import React,{useState, useEffect, useContext} from 'react';
import {Text, View, Image, Button, SafeAreaView, Modal, Pressable, StyleSheet} from 'react-native';
import {getStore} from '../Function/ApiAxios/getStore';

import UserContext from '../Provider/UserContext';
import UrlContext from '../Provider/UrlContext';

const StoreInfo = ({ route, navigation }) => {
  const {url} = useContext(UrlContext);
  const {user} = useContext(UserContext);
  const {changeCk} = route.params;
  
  const [storeData, setStoreData] = useState([]);
  useEffect(() => {
    getStore(user.StoreId, url).then((resStore) => {
      setStoreData(resStore);
    })
  }, [changeCk])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pictureView}>
        <Image style={{width:"100%", height:"100%"}}source={{uri:storeData.MainImgUrl}} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText} >
          영업시간 : {storeData.OpenTime} ~ {storeData.CloseTime}
        </Text>
        <Text style={styles.infoText}>
          휴무일 : {storeData.DayOff}
        </Text>
        <Text style={styles.infoText}>
          전화번호 : {storeData.TelNo}
        </Text>
        <Text style={styles.infoText}>
          주소 : {storeData.Addr1} {storeData.Addr2}
        </Text>
      </View>
      <View style={styles.mapView}>
        <Image 
          
          source={require('../../assets/img/map1.jpg')} />

      </View>
    </SafeAreaView>

  );
};


const styles = StyleSheet.create({
  container : {
    flex :1,
    backgroundColor : 'white',
  },
  pictureView :{
    flex :2,
    borderWidth: 1,
  },
  

  infoContainer : {
    flex :1,
    borderWidth: 1,
  },
  infoText : {
    fontSize : 20,
  },

  mapView : {
    flex : 2
  }

});

export default StoreInfo;
