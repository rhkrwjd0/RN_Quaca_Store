import axios from 'axios';
import {nowUrl} from '../../UrlAddress';

export const getOrderNoticeDetail = (userPayId, commonUrl) => {
  return new Promise((resolve, reject) => {
    // const url = `${nowUrl().express}users/orderlistDetail`;
    const url = `${commonUrl.express}orders/orderlistDetail`;
    const param = {
      UserPayid : userPayId
    };
    console.log('url > ',url)
    console.log('parma > ',param)
    axios
      .post(url, param)
      .then((resOrderNoticeDetail) => {
        if (resOrderNoticeDetail.data.success) {
          resolve(resOrderNoticeDetail.data.info);
          
        } else {
          console.log('실패 > ',resOrderNoticeDetail.data.success)
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
