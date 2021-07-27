import axios from 'axios';
import {nowUrl} from '../../UrlAddress';

export const getOrderNoticeRc = (userPayId, stime, commonUrl) => {
  return new Promise((resolve, reject) => {
    // const url = `${nowUrl().notice}RCsend`;
    const url = `${commonUrl.notice}RCsend`;
    const param = {
      UserPayId : userPayId,
      time : stime
    };
    console.log('url > ',url)
    console.log('param > ',param)
    axios
      .post(url, param)
      .then((resOrderNoticeRc) => {
        if (resOrderNoticeRc.data.success) {
          console.log('알람 성공 > ',resOrderNoticeRc.data)
          resolve(resOrderNoticeRc.data);
        } else {
          console.log('알람 실패 > ',resOrderNoticeRc.data.msg)
        }
      })
      .catch((err) => {
        alert(
          '정보를 받아 올 수 없습니다. 네트워크 연결상태를 확인해주세요.1111',
        );
        reject(err);
      });
  });
};
