import axios from 'axios';
import {nowUrl} from '../../UrlAddress';

// 제조완료(PC) -> 픽업 완료 (PUC) 변경 처리
export const getOrderStatePC = (storeId, userPayId, commonUrl) => {
  return new Promise((resolve, reject) => {
    // const url = `${nowUrl().express}users/PCPUCchange`;
    const url = `${commonUrl.express}orders/PCPUCchange`;
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
          console.log('성공 > ',resOrderState.data.info)
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
