import React,{useState, useEffect, useContext} from 'react';
import { Text, View, Image, Button, SafeAreaView, StyleSheet, TextInput} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RadioButton } from 'react-native-paper';
import {getMenuInfo} from '../Function/ApiAxios/getMenuInfo';
import {getMenuInfoUpdate} from '../Function/ApiAxios/getMenuInfoUpdate';
import UrlContext from '../Provider/UrlContext';




const MenuInfoUpdate = ({ route, navigation }) => {

  const { storeId, menuId, changeData, category } = route.params;
  const {url} = useContext(UrlContext);

  const [menuName, setMenuName] = useState(''); // 메뉴 명
  const [price, setPrice] = useState(''); // 가격 
  const [imgUrl, setImgUrl] = useState(''); // 이미지
  const [optionA, setOptionA] = useState(''); // 옵션
  const [optionB, setOptionB] = useState(''); // 옵션
  const [optionC, setOptionC] = useState(''); // 옵션
  const [best, setBest] = React.useState('Y'); // 추천메뉴 설정
  // 메뉴 삭제
  
  useEffect(() => {
    getMenuInfo(storeId, menuId, url).then((resMenu) => {  
    
      setMenuName(resMenu.MenuName);
      setPrice(resMenu.Price);
      setImgUrl(resMenu.ImgUrl);
      setOptionA(resMenu.OptionA);
      setOptionB(resMenu.OptionB);
      setOptionC(resMenu.OptionC);
      setBest(resMenu.Best);
    })
  }, [])
  // 각 항목 체인지 
  const menuNameHandler = text => {setMenuName(text);};
  const priceHandler = text => {setPrice(text);};
  const imgUrlHandler = text => {setImgUrl(text);};
  const optionAHandler = text => {setOptionA(text);};
  const optionBHandler = text => {setOptionB(text);};
  const optionCHandler = text => {setOptionC(text);};


  return (
    <KeyboardAwareScrollView>
        <SafeAreaView style={styles.container}>
        <View style={styles.titleView}>
            <Text style={styles.title}>수정</Text>
        </View>
        <View style={{flex:8}}>
            <View>
                <Text style={styles.text}>메뉴 명</Text>
                <TextInput style={styles.textInput} value={menuName} onChangeText={menuNameHandler}/>
            </View>
            <View>
                <Text style={styles.text}>가격</Text>
                <TextInput style={styles.textInput} value={price} onChangeText={priceHandler}/>
            </View>
            <View>
                <Text style={styles.text}>옵션 A</Text>
                <TextInput style={styles.textInput} value={optionA} onChangeText={optionAHandler}/>
            </View>    
            <View>
                <Text style={styles.text}>옵션 B</Text>
                <TextInput style={styles.textInput} value={optionB} onChangeText={optionBHandler}/>
            </View>    
            <View>
                <Text style={styles.text}>옵션 C</Text>
                <TextInput style={styles.textInput} value={optionC} onChangeText={optionCHandler}/>
            </View>    
            <RadioButton.Group 
                onValueChange={
                    newValue => setBest(newValue)} 
                    value={best}
            >
                <Text style={styles.text}>추천여부</Text>
                <View style={styles.radioButtonGroupView}> 
                    <View style={styles.radioButtonView}>
                        <Text style={styles.radioButtonText}>추천</Text>
                        <RadioButton value="Y" />
                    </View>
                    <View style={styles.radioButtonView}>
                        <Text style={styles.radioButtonText}>비추</Text>
                        <RadioButton value="N" />
                    </View>
                </View>
            </RadioButton.Group>
            <View>
                <Text style={styles.text}>이미지</Text>
                <TextInput style={styles.textInput} value={imgUrl} onChangeText={imgUrlHandler}/>
            </View>    



        </View>
        <View style={styles.buttonViewContainer}>
            <View style={styles.buttonView}>
                <Button title="저장"
                    onPress={() => {
                        
                        getMenuInfoUpdate(url, storeId, menuId, menuName, price, imgUrl, optionA, optionB, optionC, best)
                        .then((resMenuInfoUpdate) =>{
                            var msg = "실패했습니다.";
                            if(resMenuInfoUpdate.success){
                                msg = "성공했습니다.";
                                alert(msg);
                                var date = new Date();
                                navigation.navigate(category,{
                                    changeData : date.getHours()+date.getMinutes()+date.getSeconds()
                                });
                                
                            }
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
    radioButtonGroupView :{
        backgroundColor:'white', 
        borderBottomWidth:1,
        flexDirection:'row'
    },
    radioButtonView:{
        flexDirection:'row',
        justifyContent:'center', 
        alignItems:'center'
    },
    radioButtonText:{
        fontSize:20
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
export default MenuInfoUpdate;
