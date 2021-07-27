import axios from 'axios';
import {nowUrl} from '../../UrlAddress';

// OR(접수대기) -> RC(접수완료) 변경 처리
export const getOrderStateOC = (storeId, userPayId, commonUrl) => {
  return new Promise((resolve, reject) => {
    // const url = `${nowUrl().express}users/OCRCchange`;
    const url = `${commonUrl.express}orders/OCRCchange`;
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
          console.log('OC->RC성공 > ',resOrderState.data.info)
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
