import axios from 'axios';
import {nowUrl} from '../../UrlAddress';

export const getStore = (storeId, commonUrl) => {
  return new Promise((resolve, reject) => {
    //const url = `${nowUrl().express}users/store`;
    const url = `${commonUrl.express}store/store`;
    const param = {
      StoreId: storeId,
    };
    console.log('url >',url)
    axios
      .post(url, param)
      .then((resStore) => {
        if (resStore.data.success) {
          console.log('성공 > ',resStore.data.info)
          resolve(resStore.data.info);
          
        } else {
          console.log('실패 > ',resStore.data.msg)
        }
      })
      .catch((err) => {
        alert(
          '매장정보를 받아 올 수 없습니다. 네트워크 연결상태를 확인해주세요.',
        );
        reject(err);
      });
  });
};
