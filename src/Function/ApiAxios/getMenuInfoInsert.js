import axios from 'axios';
import {nowUrl} from '../../UrlAddress';

export const getMenuInfoInsert = (commonUrl, storeId, largeDivCd, midDivCd, menuName, price, imgUrl, optionA, optionB, optionC, best, useYn) => {
  return new Promise((resolve, reject) => {
    // const url = `${nowUrl().express}users/Minsert`;
    const url = `${commonUrl.express}menu/Minsert`;
    const param = {
      StoreId : storeId, 
      LargeDivCd : largeDivCd, 
      MidDivCd : midDivCd, 
      MenuName : menuName, 
      Price : price, 
      ImgUrl : imgUrl, 
      OptionA : optionA, 
      OptionB : optionB, 
      OptionC : optionC, 
      Best : best, 
      UseYn : useYn
    };
    console.log('url > ',url)
    console.log('param > ',param)
    axios
      .post(url, param)
      .then((resMenuInfoInsert) => {
        console.log(resMenuInfoInsert.data)
        if (resMenuInfoInsert.data.success) {
          resolve(resMenuInfoInsert.data);
          
        } else {
          console.log('실패 > ',resMenuInfoInsert.data.msg)
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
