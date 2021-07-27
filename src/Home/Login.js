import React, {useState, useEffect, useContext} from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Button, Text, View, TextInput, StyleSheet, SafeAreaView} from 'react-native';

import { setUserInfo, getUserInfo } from '../Function/User/AsyncUser';
import {getUser, GetToken, TokenUpdate} from '../Function/ApiAxios/getUser';
import {nowUrl} from '../UrlAddress';
import UserContext from '../Provider/UserContext';
import UrlContext from '../Provider/UrlContext';

const Login = ({navigation}) => {
  
  const [sId, setSId] = useState("");
  const [passWord, setPassWord] = useState("");
  

  const sIdHandler= text =>{setSId(text);}
  const passWordHandler= text =>{setPassWord(text);}

  const {setUser} = useContext(UserContext);
  const {user} = useContext(UserContext);
  const {setUrl} = useContext(UrlContext);

  useEffect(() => {
    nowUrl().then((resUrl) => {
      setUrl({url: resUrl});
    }).catch((err) => { 
      alert(err);
    });
    getUserInfo().then((resGet) => {
      if(resGet.success){
        if(resGet.value != null){
          console.log("++++++++",JSON.parse(resGet.value)[0])
          setUser({user: JSON.parse(resGet.value)[0]});
          setSId(user.SID)
          setPassWord(user.PassWord)
          
          navigation.navigate('Main'); 
        }
      }
    }).catch((err) => {
      alert(err);
    });

  },[]);


  const {url} = useContext(UrlContext);

  return (
    
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={false} keyboardShouldPersistTaps="always"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>QUACA</Text>
          <Text style={styles.title}>관리자</Text>
        </View>
          <View style={styles.inputContainer}>        
              <TextInput 
                style={styles.input}
                placeholder="아이디 : "
                placeholderTextColor={'#999'}
                onChangeText={sIdHandler}
                value={sId}
              />
              <TextInput 
                style={styles.input} 
                placeholder="비밀번호 : "
                placeholderTextColor={'#999'}
                onChangeText={passWordHandler}
                value={passWord}
              />
          </View>
        <View style = {styles.buttonContainer}>
          <Button
            style = {styles.button}
            title="로그인"
            onPress={() => {
              
              // 기기 토큰 불러오기 
              GetToken().then((token) => {
                
                // 로그인 정보 확인
                getUser(sId, passWord, url)
                .then((resUser) => {
                  var msg ="실패 했습니다.";
                  if(resUser.success){

                    // AsyncStoarage 담기
                    setUserInfo(resUser.info)
                    .then((resSet) => {
                      if (resSet) {console.log("씽크",resSet)} 
                      else {alert(resSet);}
                    })
                    .catch((err) => {
                      alert(err);
                    });


                    // 토큰 비교(기존기기와 현 기기) 
                    if(token == resUser.info.Token){
                      // 같다면 패스
                      setUser({user: resUser.info});
                      msg ="토큰 == 성공 했습니다.";
                      alert(msg);
                      navigation.navigate('Main');
                    }else{
                      // 다르다면 토큰 업데이트 및 패스
                      TokenUpdate(resUser.info.SID, token, url).then((resUpdate) => {
                        setUser({user: resUpdate.info});
                        msg ="토근 != 성공 했습니다.";
                        alert(msg);
                        navigation.navigate('Main');
                      });
                    }
                  }else{
                    alert(msg);
                  }
                  
                })
                .catch((err) => {
                  alert(err);
                });
              })
            }}
            />
        </View>
        <View style = {styles.buttonContainer}>
          {/* <Button
              title="토큰받기(테스트용)"
              onPress={() =>
                GetToken().then((token) => {
                  alert(token);
                })
                
              }
          /> */}
          {/* <Button
            style = {styles.button}
            title="홈으로~"
            onPress={() => {
              navigation.navigate('Main');
            }}
            />
        </View> */}
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex :1,
  },
  titleContainer : {
    flex :2,
    alignItems : "center",
    justifyContent: 'center',
  },
  title : {
    fontSize : 40,
  },
  inputContainer: {
    flex :1,
    flexDirection: 'column',
    marginLeft : 10,
    marginRight : 10,
  },
  input: {
    backgroundColor:'white', 
    fontSize: 24,
    borderWidth: 1,
    width : '100%',
    height : 80,
    margin : 5 
  },
  buttonContainer : {
    flex :2,
    justifyContent: 'center',
    margin : 20
  },
  button : {
    flex :1,
  } 
});
export default Login;
