import axios from 'axios';
import {Alert} from 'react-native';

const UrlAddress = {
  express_docker: 'http://tera-energy.iptime.org:10020/',
  notice_docker : 'http://tera-energy.iptime.org:10050/',
  jh_com_express: 'http://192.168.0.17:10020/',
};

// const nowUrl = () => {
//   //return {geo: UrlAddress.express_heroku, express: UrlAddress.jh_com_express, notice:UrlAddress.notice}; // 로컬
//   //return {express: UrlAddress.express_heroku, geo: UrlAddress.jh_com_express, notice:UrlAddress.notice}; // 실
// };

const nowUrl = () => {
  return new Promise((resolve, reject) => {
    const url = 'https://tera-energy.github.io/Tera_Quaca_Common/server.json';
    axios
      .get(url)
      .then((resUrl) => {
        console.log('resUrl > ', resUrl.data);
        const urlJson = {
          express: resUrl.data.store.serverUrl,
          notice: resUrl.data.customerNotice.serverUrl,
        };
        resolve(urlJson);
      })
      .catch((err) => {
        console.log('getCommonUrl error >', err);
        Alert.alert('SERVER ERROR', '서버정보를 불러 올 수 없습니다.');
        const urlJson = {
          express: UrlAddress.express_docker,
          notice: UrlAddress.notice_docker,
        };
        resolve(urlJson);
      });
  });
};


export {nowUrl};
