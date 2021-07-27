import React,{useState, useEffect, useContext} from 'react';
import {Text, View, Image, Button, SafeAreaView, StyleSheet, TextInput} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {getStore} from '../Function/ApiAxios/getStore';
import {getStoreUpdate} from '../Function/ApiAxios/getStoreUpdate';

import UrlContext from '../Provider/UrlContext';


const StoreInfoUpdate = ({ route, navigation }) => {
  // 전 페이지 파라미터 값
  const { storeId } = route.params;
  const {url} = useContext(UrlContext);

  const [openTime, setOpenTime] = useState('');     // 오픈 시간
  const [closeTime, setCloseTime] = useState('');  // 닫는 시간
  const [dayOff, setDayOff] = useState('');           // 휴무일
  const [telNo, setTelNo] = useState('');              // 연락처
  const [addr1, setAddr1] = useState('');              // 기본주소
  const [addr2, setAddr2] = useState('');              // 상세주소
  const [mainImgUrl, setMainImgUrl] = useState(''); // 메인 Url

  useEffect(() => {
    getStore(storeId, url).then((resStore) => {  
    
      setOpenTime(resStore.OpenTime);
      setCloseTime(resStore.CloseTime);
      setDayOff(resStore.DayOff);
      setTelNo(resStore.TelNo);
      setAddr1(resStore.Addr1);
      setAddr2(resStore.Addr2);
      setMainImgUrl(resStore.MainImgUrl);
    })
  }, [])

  // 각 항목 체인지 
  const openTimeHandler = text => {setOpenTime(text);};
  const closeTimeHandler = text => {setCloseTime(text);};
  const dayOffHandler = text => {setDayOff(text);};
  const telNoHandler = text => {setTelNo(text);};
  const addr1Handler = text => {setAddr1(text);};
  const addr2Handler = text => {setAddr2(text);};
  const mainImgUrlHandler = text => {setMainImgUrl(text);};


  return (
    <KeyboardAwareScrollView>
        <SafeAreaView style={styles.container}>
        <View style={styles.titleView}>
            <Text style={styles.title}>수정</Text>
        </View>
        <View style={{flex:8}}>
            <View>
                <Text style={styles.text}>오픈시간</Text>
                <TextInput style={styles.textInput} value={openTime} onChangeText={openTimeHandler} autoCorrect={false}/>
            </View>
            <View>
                <Text style={styles.text}>닫는시간</Text>
                <TextInput style={styles.textInput} value={closeTime} onChangeText={closeTimeHandler} autoCorrect={false}/>
            </View>
            <View>
                <Text style={styles.text}>휴무일</Text>
                <TextInput style={styles.textInput} value={dayOff} onChangeText={dayOffHandler} autoCorrect={false}/>
            </View>
            <View>
                <Text style={styles.text}>전화번호</Text>
                <TextInput style={styles.textInput} value={telNo} onChangeText={telNoHandler} autoCorrect={false}/>
            </View>
            <View>
                <Text style={styles.text}>주소</Text>
                <TextInput style={styles.textInput} value={addr1} onChangeText={addr1Handler} autoCorrect={false}/>
                <TextInput style={styles.textInput} value={addr2} onChangeText={addr2Handler} autoCorrect={false}/>
            </View>
            <View>
                <Text style={styles.text}>메인 URL</Text>
                <TextInput style={styles.textInput} value={mainImgUrl} onChangeText={mainImgUrlHandler} autoCorrect={false}/>
            </View>
        </View>
        <View style={styles.buttonViewContainer}>
            <View style={styles.buttonView}>
                <Button title="저장"
                    onPress={() => {
                        
                        getStoreUpdate(url,storeId, openTime, closeTime, dayOff, telNo, addr1, addr2, mainImgUrl)
                        .then((resStoreUpdate) =>{
                            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>",resStoreUpdate)
                            var msg = "실패했습니다.";
                            if(resStoreUpdate.success){
                                msg = "성공했습니다.";
                                var date = new Date();
                                navigation.navigate('StoreInfo',{
                                    changeCk : date.getHours()+date.getMinutes()+date.getSeconds()
                                    //changeCk : !changeCk
                                })
                            }
                            alert(msg);
                            
                        });
                    }}
                />
            </View>
            <View style={styles.buttonView}>
                <Button title="취소"
                    onPress={() => 
                        navigation.goBack()
                    }
                />
            </View>
        </View>
        </SafeAreaView>
    </KeyboardAwareScrollView>

  );
};

const styles = StyleSheet.create({
    container : {
        margin: 15, 
        padding:15
    },
    titleView : {
        flex:1, 
        justifyContent:'center', 
        alignItems:'center'
    },
    title : {
        fontSize:24
    },
    text :{
        fontSize:18
    },
    textInput : {
        backgroundColor:'white', 
        borderBottomWidth:1
    },
    buttonViewContainer : {
        flex:1, 
        flexDirection:'row', 
        justifyContent:'center', 
        padding:5
    },
    buttonView : {
        justifyContent:'center',
        width:'50%',
        padding : 5,
    },
});
export default StoreInfoUpdate;
