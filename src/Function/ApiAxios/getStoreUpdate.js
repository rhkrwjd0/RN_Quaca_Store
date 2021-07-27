import axios from 'axios';
import {nowUrl} from '../../UrlAddress';

export const getStoreUpdate = (commonUrl, storeId, openTime, closeTime, dayOff, telNo, addr1, addr2, mainImgUrl) => {
  return new Promise((resolve, reject) => {
    //const url = `${nowUrl().express}users/Supdate`;
    const url = `${commonUrl.express}store/Supdate`;
    const param = {
      StoreId: storeId,
      OpenTime : openTime,
      CloseTime : closeTime,
      DayOff : dayOff,
      TelNo : telNo,
      Addr1 : addr1,
      Addr2 : addr2,
      MainImgUrl : mainImgUrl
    };
    console.log('url > ',url)
    console.log('url > ',param)
    axios
      .post(url, param)
      .then((resStore) => {
        if (resStore.data.success) {
          console.log('성공 > ',resStore.data.rows)
          resolve(resStore.data);
          
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
