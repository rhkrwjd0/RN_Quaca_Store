import React,{useState, useEffect, useContext} from 'react';
import { Text, View, Image, Button, SafeAreaView, StyleSheet, TextInput} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RadioButton } from 'react-native-paper';
import {getMenuInfoInsert} from '../Function/ApiAxios/getMenuInfoInsert';
import UrlContext from '../Provider/UrlContext';




const MenuInfoInsert = ({ route, navigation }) => {

  const { storeId } = route.params;
  const {url} = useContext(UrlContext);

  const [largeDivCd, setLargeDivCd] = React.useState('D'); // 대분류
  const [midDivCd, setMidDivCd] = React.useState('E');     // 중분류
  
  const [menuName, setMenuName] = useState('');            // 메뉴 명
  const [price, setPrice] = useState('');                  // 가격 
  const [imgUrl, setImgUrl] = useState('');                // 이미지
  const [optionA, setOptionA] = useState('');              // 옵션 A
  const [optionB, setOptionB] = useState('');              // 옵션 B
  const [optionC, setOptionC] = useState('');              // 옵션 C
  const [best, setBest] = React.useState('Y');             // 추천메뉴 설정
  const [useYn, setUseYn] = React.useState('Y');           // 추천메뉴 설정
  

  // 각 항목 체인지 
  const menuNameHandler = text => {setMenuName(text);};
  
  const priceHandler = text => {setPrice(text);};
  const imgUrlHandler = text => {setImgUrl(text);};
  const optionAHandler = text => {setOptionA(text);};
  const optionBHandler = text => {setOptionB(text);};
  const optionCHandler = text => {setOptionC(text);};
  // 대분류 선택에 따른 이벤트 
  const largeDivCdHandler = text => {
    setLargeDivCd(text);
    if(text == 'D'){
        setMidDivCd('E');
    }else{
        setMidDivCd('');
    }
  };
 

  return (
    <KeyboardAwareScrollView>
        <SafeAreaView style={styles.container}>
        <View style={styles.titleView}>
            <Text style={styles.title}>추가</Text>
        </View>
        <View style={{flex:8}}>
            <RadioButton.Group 
                onValueChange={newValue => largeDivCdHandler(newValue)} 
                value={largeDivCd}
            >
                <Text style={styles.text}>대분류</Text>
                <View style={styles.radioButtonGroupView}> 
                    <View style={styles.radioButtonView}>
                        <Text style={styles.radioButtonText}>드링크</Text>
                        <RadioButton value="D"/>
                    </View>
                    <View style={styles.radioButtonView}>
                        <Text style={styles.radioButtonText}>브레드</Text>
                        <RadioButton value="B"/>
                    </View>
                    <View style={styles.radioButtonView}>
                        <Text style={styles.radioButtonText}>상품</Text>
                        <RadioButton value="G"/>
                    </View>
                </View>
            </RadioButton.Group>
            {
                
                (function(){
                    if(largeDivCd == 'D'){
                        
                        return (
                            <RadioButton.Group 
                                onValueChange={newValue => setMidDivCd(newValue)} 
                                value={midDivCd}
                            >
                                <Text style={styles.text}>중분류</Text>
                                <View style={styles.radioButtonGroupView}> 
                                    <View style={styles.radioButtonView}>
                                        <Text style={styles.radioButtonText}>에스프레소</Text>
                                        <RadioButton value="E" />
                                    </View>
                                    <View style={styles.radioButtonView}>
                                        <Text style={styles.radioButtonText}>차</Text>
                                        <RadioButton value="T" />
                                    </View>      
                                </View>
                            </RadioButton.Group>
                        )
                    }else{
                        
                    }
                })()
            }
            
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
            <RadioButton.Group 
                onValueChange={
                    newValue => setUseYn(newValue)} 
                    value={useYn}
            >
                <Text style={styles.text}>사용여부</Text>
                <View style={styles.radioButtonGroupView}> 
                    <View style={styles.radioButtonView}>
                        <Text style={styles.radioButtonText}>사용</Text>
                        <RadioButton value="Y" />
                    </View>
                    <View style={styles.radioButtonView}>
                        <Text style={styles.radioButtonText}>비사용</Text>
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
                        console.log(url, storeId, largeDivCd, midDivCd, menuName, price, imgUrl, optionA, optionB, optionC, best, useYn)
                        getMenuInfoInsert(url, storeId, largeDivCd, midDivCd, menuName, price, imgUrl, optionA, optionB, optionC, best, useYn)
                        .then((resMenuInfoInsert) =>{
                            var msg = "실패했습니다.";
                            if(resMenuInfoInsert.success){
                                msg = "성공했습니다.";
                                alert(msg);
                                let category = '';
                                if(largeDivCd == 'D'){
                                    category = "drink";
                                }else if(largeDivCd == 'B'){
                                    category = "bread";
                                }else if(largeDivCd == 'G'){
                                    category = "goods";
                                }
                                
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
export default MenuInfoInsert;
