import axios from 'axios';
import {nowUrl} from '../../UrlAddress';

export const getOrderNotice = (storeId, commonUrl) => {
  return new Promise((resolve, reject) => {
    // const url = `${nowUrl().express}users/allorderlist`;
    const url = `${commonUrl.express}orders/allorderlist`;
    const param = {
      StoreId : storeId,
    };
    console.log('url > ',url)
    axios
      .post(url, param)
      .then((resOrderNotice) => {
        if (resOrderNotice.data.success) {
          console.log('성공 > ',resOrderNotice.data.info)
          resolve(resOrderNotice.data.info);
          
        } else {
          console.log('실패 > ',resOrderNotice.data.msg)
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
