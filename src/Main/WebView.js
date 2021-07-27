import React, {Component, useRef, useContext} from 'react';
import { WebView } from 'react-native-webview';

import UserContext from '../Provider/UserContext';

const WebViewInfo = () =>{

  const {user} = useContext(UserContext);

  const url = "http://192.168.0.10:3002/main?StoreId="+user.StoreId;


  return  <WebView
      source={{uri: url}}
    />
    
}

export default WebViewInfo
