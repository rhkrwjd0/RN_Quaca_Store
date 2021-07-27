import axios from 'axios';
import {nowUrl} from '../../UrlAddress';
import messaging from '@react-native-firebase/messaging';

export const getUser = (sId, passWord, commonUrl) => {
  console.log(">>>><<<<<<")
  return new Promise((resolve, reject) => {
    const url = `${commonUrl.express}users/login`;
    const param = {
      SID: sId,
      PassWord : passWord
    };
    console.log('url > ',url)
    axios
      .post(url, param)
      .then((resUser) => {
        resolve(resUser.data);
        
      })
      .catch((err) => {
          alert(
          '매장정보를 받아 올 수 없습니다. 네트워크 연결상태를 확인해주세요.',
          );
          reject(err);
      });
  });

};



export const GetToken = () => {
  return new Promise((resolve, reject) => {
    messaging()
      .getToken()
      .then((fcmToken) => {
        resolve(fcmToken);
      })
      .catch((err) => {
        reject(err);
      });
  });
};


export const TokenUpdate = (sId, token, commonUrl) => {
  return new Promise((resolve, reject) => {

    console.log('token > ',token)
    //const url = `${nowUrl().express}users/tokenupdate`;
    const url = `${commonUrl.express}users/tokenupdate`;
    const param = {SID: sId, Token: token};
    console.log('param===================>',param)
    axios
      .post(url, param)
      .then((resUpdate) => {
        console.log("===",resUpdate)
        if (resUpdate.data.success) {
          //alert('토큰이 수정되었습니다.');
          console.log('토큰이 수정되었습니다.',resUpdate.data)
          resolve(resUpdate.data);
        } else {
          console.log('토큰이 실패',resUpdate.data.msg)
          
        }
      })
      .catch((err) => {
        console.log('TokenUpdate error : ', err)
      });
  });
};