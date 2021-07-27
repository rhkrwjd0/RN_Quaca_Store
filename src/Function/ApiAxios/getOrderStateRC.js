import axios from 'axios';
import {nowUrl} from '../../UrlAddress';

// RC(접수완료) -> 제조완료(PC) 변경 처리
export const getOrderStateRC = (storeId, userPayId, commonUrl) => {
  return new Promise((resolve, reject) => {
    //const url = `${nowUrl().express}users/RCPCchange`;
    const url = `${commonUrl.express}orders/RCPCchange`;
    const param = {
      StoreId : storeId,
      UserPayId : userPayId
    };
    console.log(param);
    console.log('url > ',url)
    axios
      .post(url, param)
      .then((resOrderState) => {
        if (resOrderState.data.success) {
          console.log('RC->PC성공 > ',resOrderState.data.info)
          resolve(resOrderState.data);
          
          




        } else {
          console.log('실패 > ',resOrderState.data.msg)
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
