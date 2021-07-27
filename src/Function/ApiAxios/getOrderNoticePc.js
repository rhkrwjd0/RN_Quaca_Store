import axios from 'axios';
import {nowUrl} from '../../UrlAddress';

export const getOrderNoticePc = (userPayId, commonUrl) => {
  return new Promise((resolve, reject) => {
    // const url = `${nowUrl().notice}PCsend`;
    const url = `${commonUrl.notice}PCsend`;
    const param = {
      UserPayId : userPayId,
  
    };
    console.log('url > ',url)
    axios
      .post(url, param)
      .then((resOrderNoticePc) => {
        if (resOrderNoticePc.data.success) {
          console.log('알람 성공 > ',resOrderNoticePc.data)
          resolve(resOrderNoticePc.data);
        } else {
          console.log('알람 실패 > ',resOrderNoticePc.data.msg)
        }
      })
      .catch((err) => {
        alert(
          '정보를 받아 올 수 없습니다. 네트워크 연결상태를 확인해주세요.',
        );
        reject(err);
      });
  });
};
