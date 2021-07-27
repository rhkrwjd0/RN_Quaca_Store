import axios from 'axios';
import {nowUrl} from '../../UrlAddress';

export const getOrderInfoA = (storeId, commonUrl) => {
  return new Promise((resolve, reject) => {
    // 17번
    // const url = `${nowUrl().express}users/RCorderlist`;
    const url = `${commonUrl.express}orders/RCorderlist`;
    const param = {
      StoreId : storeId,
    };
    console.log('url > ',url)
    axios
      .post(url, param)
      .then((resOrderInfoA) => {
        if (resOrderInfoA.data.success) {
          console.log('성공 > ',resOrderInfoA.data.info)
          resolve(resOrderInfoA.data);
          
        } else {
          console.log('실패> ',resOrderInfoA.data.msg)
          resolve(resOrderInfoA.data);
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
