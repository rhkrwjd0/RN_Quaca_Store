import React, {useState, useEffect, useContext} from 'react';
import {Text, Button, StyleSheet, View, TouchableOpacity, Alert} from 'react-native';

import {getUserInfo, removeUserInfo } from '../Function/User/AsyncUser';
import messaging from '@react-native-firebase/messaging';
import {CommonActions, StackActions } from '@react-navigation/native';

import UserContext from '../Provider/UserContext';

const Main = ({navigation}) => {

  const {user} = useContext(UserContext);
  

  const showAlert = (title, message) => {
      Alert.alert(
        title,
        message,
        [{text: '확인', onPress: () => {
          console.log('OK Pressed');
          navigation.navigate("Main");
          navigation.navigate("OrderInfo");
     
        }}],
        {cancelable: false},
      );
  };

  // fcm테스트
  messaging().onMessage(async (message) => {
    const {title, body} = message.notification;
    showAlert(title, body);
    //const {storeId} = message.data;
    // if(user.StoreId == storeId){
    // }else{
    //   removeUserInfo().then((resGet) =>{
    //     if(resGet){
    //       alert("로그아웃 되었습니다.")
    //       navigation.navigate('Login'); 
    //     }else{
    //       alert("실패 했습니다.")
    //     }
    //   }).catch((err) => {
    //     alert(err);
    //   });
    // }

  });

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>QUACA</Text>
      </View>
      <View style={styles.touchContainer}>
        <View style = {styles.touchView}>
          <TouchableOpacity
            style = {styles.touch}
            onPress={() => {
              navigation.navigate('StoreInfo');
            }}>
            <Text style = {styles.touchText}>매장정보</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style = {styles.touch}
            onPress={() => {
              navigation.navigate('MenuInfo');
            }}>
            <Text style = {styles.touchText}>메뉴정보</Text>
          </TouchableOpacity>
        </View>
        <View style = {styles.touchView}>
          <TouchableOpacity
            style = {styles.touch}
            onPress={() => {
              navigation.navigate('OrderInfo');
            }}>
            <Text style = {styles.touchText}>접수내역</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style = {styles.touch}
            onPress={() => {
              navigation.navigate('OrderNotice');
            }}>
            <Text style = {styles.touchText}>주문내역</Text>
          </TouchableOpacity>
        </View>
        <View style = {styles.touchView}>
          <TouchableOpacity
            style = {styles.touch}
            onPress={() => {
              removeUserInfo().then((resGet) =>{
                console.log("로그아웃?>>>",resGet)
                if(resGet){
                  alert("로그아웃 되었습니다.")
                  navigation.navigate('Login'); 
                }else{
                  alert("실패 했습니다.")
                }
              }).catch((err) => {
                alert(err);
              });
            }}>
            <Text style = {styles.touchText}>로그아웃</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style = {styles.touch}
            onPress={() => {
              navigation.navigate('WebView');
            }}>
            <Text style = {styles.touchText}>웹뷰</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footerContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  
  },
  title: {
    fontSize: 40,
  },

  touchContainer: {
    flex: 8,
    
  },
  touchView : {
    flex:1,
    flexDirection:'row',
    
  },
  touch: {
    flex:1,
    justifyContent: 'center',
    alignItems : "center",
    borderWidth: 1,
  },
  touchText: {
    fontSize : 24
  },
  footerContainer: {
    flex: 1,
    
  },
});

export default Main;
