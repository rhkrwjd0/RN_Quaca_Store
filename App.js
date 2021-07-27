import React, {useEffect, useContext}  from 'react';
import {SafeAreaView, StyleSheet, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';


import HomeStack from './src/Navi/HomeStack';
import UserProvider from './src/Provider/UserProvider';
import UrlProvider from './src/Provider/UrlProvider';

const App = () => {  

  return (
    <SafeAreaView style={styles.container}>
      <UrlProvider>
        <UserProvider>
          <NavigationContainer>
            <HomeStack />
          </NavigationContainer>
        </UserProvider>
      </UrlProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
});

export default App;
