import axios from 'axios';
import {nowUrl} from '../../UrlAddress';

export const getMenu = (storeId, commonUrl) => {
  return new Promise((resolve, reject) => {
    // const url = `${nowUrl().express}users/menulist`;
    const url = `${commonUrl.express}menu/menulist`;
    const param = {
      StoreId: storeId,
    };
    console.log('url >',url)
    axios
      .post(url, param)
      .then((resMenu) => {
        if (resMenu.data.success) {
          console.log('성공 > ',resMenu.data.info)
          resolve(resMenu.data.info);
          
        } else {
          console.log('실패 > ',resMenu.data.msg)
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
