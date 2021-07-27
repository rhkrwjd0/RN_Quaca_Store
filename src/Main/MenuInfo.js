import React,{useState, useEffect, useContext} from 'react';
import {SafeAreaView, StyleSheet, Text, ScrollView, View, Button, FlatList, Image, Modal, Pressable} from 'react-native';
import {getMenu} from '../Function/ApiAxios/getMenu';
import UserContext from '../Provider/UserContext';
import UrlContext from '../Provider/UrlContext';


const StoreMenu = ({navigation, route}) => {

  const {user} = useContext(UserContext);
  const {url} = useContext(UrlContext);

  // navigator 에서 파라미터로 보낸 카테고리받아서 화면에 보여주기
  var category = route.params.category;
  
  const [changeData, setChangeData] = useState(route.params.changeData);

  // 해당 매장 메뉴 List 가져오기
  const [menuData, setMenuData] = useState([]);
  useEffect(() => {
    getMenu(user.StoreId, url).then((resMenu) => {
      setMenuData(resMenu[category]);
    })
  }, [route.params.changeData])

  const renderItem = ({item}) =>{
    return (
      <View style={styles.renderItemView}>
        <View style={styles.imgView}>
          <Image style={styles.img} source={{uri:item.ImgUrl}} />
        </View>
        <View style={styles.textView}>
          <Text>{item.MenuName}</Text>
          <Text>{item.Price}원</Text>
        </View>
        <View style={styles.buttonView}>
          <Button style={styles.button} title="수정" 
            onPress={() => {
              navigation.navigate('MenuInfoUpdate',{
                storeId : user.StoreId,
                menuId : item.MenuId,
                changeData : changeData,
                category : category
              });
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView  style={styles.container}>
      <FlatList
          data ={menuData}
          renderItem= {renderItem}
          keyExtractor ={(item) => String(item.MenuId)}
      />
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container : {
    flex : 1
  },
  renderItemView : {
    flex:1, 
    flexDirection:"row", 
    borderWidth:1, 
    paddingTop:5
  },
  imgView : {
    flex:1
  },
  img : {
    width:"100%", 
    height:"100%"
  },
  textView : {
    flex:3
  },
  buttonView : {
    flex:1
  },
  button : {
    padding : 5
  }
});

export default StoreMenu;
