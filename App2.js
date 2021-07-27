import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Button,
  Alert
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/Home/HomeScreen';
import NoticeScreen from './src/Home/NoticeScreen';



const Main = ({ navigation }) => {

  console.log('sdfas>', navigation)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Button style={styles.btn} title="임시영 페이지로" onPress={() => navigation.navigate('Home')} />
      </View>
      <View style={styles.box}>
        <Button style={styles.btn} title="알림 페이지로" onPress={() => navigation.navigate('Notice')} />
      </View>
    </SafeAreaView>
  )
}


const App = () => {

  // // fcm alert
  // const showAlert = (title, message) => {
  //   Alert.alert(
  //     title,
  //     message,
  //     [{ text: '확인', onPress: () => console.log('OK Pressed') }],
  //     { cancelable: false },
  //   );
  // };

  // // fcm 받기
  // messaging().onMessage(async (message) => {
  //   console.log(message)
  //   const { title, body } = message.notification;
  //   showAlert(title, body);
  // });





  const Stack = createStackNavigator();

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Notice" component={NoticeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  box: {
    marginBottom: 20,
  },
  btn: {
    backgroundColor: 'red'
  }
});

export default App;
