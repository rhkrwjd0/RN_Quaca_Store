import React,{useState} from 'react';
import {Text, Modal, Button, StyleSheet, View ,Pressable ,TouchableOpacity} from 'react-native';

const StoreModal = (props) => {
    const [modalVisible, setModalVisible] = useState(props.modalVisible);
    
    return (
        <>
            <Modal
                animationType="slide"
                transparent = {true}
                visible={modalVisible}
                style={{height: "100%", width: "100%"}}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>
                            {props.storeId} : 스토어 코드 

                        </Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>닫기</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#0f0',
      },
      appTitle: {
        color: '#fff',
        fontSize: 36,
        marginTop: 30,
        marginBottom: 30,
        fontWeight: '300',
        textAlign: 'center',
        backgroundColor: '#3143e8',
      },
      card: {
        backgroundColor: '#fff0',
        
        flex: 1,
        
        
      },
      input: {
        padding: 20,
        borderBottomColor: '#bbb',
        borderBottomWidth: 1,
        fontSize: 24,
        marginLeft: 20,
      },
      // FlatList style
      renderItemContainer:{
        flexDirection:'row', 
        borderWidth:0, 
        height:100
      },
      renderItemImgView:{
        flex:1, 
        borderWidth:0
      },
      renderItemImg : {
        height:'100%', 
        width:'100%', 
        justifyContent: 'center'
      },
      renderItemContents:{
        flex:3, 
        borderWidth:1
      },






    centeredView: {
    flex: 1,
    justifyContent: "center",
    
    marginTop: 15
    },
    modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
    },
    button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
    },
    buttonOpen: {
    backgroundColor: "#F194FF",
    },
    buttonClose: {
    backgroundColor: "#2196F3",
    },
    textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
    },
    modalText: {
    marginBottom: 15,
    textAlign: "center"
    }
  });

export default StoreModal