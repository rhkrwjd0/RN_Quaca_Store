import axios from 'axios';
import {nowUrl} from '../../UrlAddress';

export const getOrderInfoB = (storeId, commonUrl) => {
  return new Promise((resolve, reject) => {
    // 21번
    // const url = `${nowUrl().express}users/OCorderlist`;
    const url = `${commonUrl.express}orders/OCorderlist`;
    const param = {
      StoreId : storeId,
    };
    console.log('url > ',url)
    axios
      .post(url, param)
      .then((resOrderInfoB) => {
        if (resOrderInfoB.data.success) {
          console.log('성공 > ',resOrderInfoB.data.info)
          resolve(resOrderInfoB.data);
          
        } else {
          console.log('실패 > ',resOrderInfoB.data.msg)
          resolve(resOrderInfoB.data);
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
