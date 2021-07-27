import axios from 'axios';
import {nowUrl} from '../../UrlAddress';

export const getMenuInfoUpdate = (commonUrl, storeId, menuId, menuName, price, imgUrl, optionA, optionB, optionC, best) => {
  return new Promise((resolve, reject) => {
    // const url = `${nowUrl().express}users/Mupdate`;
    const url = `${commonUrl.express}menu/Mupdate`;
    console.log("=======",storeId, menuId)
    const param = {
      StoreId: storeId,
      MenuId : menuId,
      MenuName : menuName, 
      Price : price, 
      ImgUrl : imgUrl, 
      OptionA : optionA, 
      OptionB : optionB, 
      OptionC : optionC, 
      Best : best
    };
    console.log('url > ',url)
    console.log('param > ',param)
    axios
      .post(url, param)
      .then((resMenuInfoUpdate) => {
        console.log(resMenuInfoUpdate.data)
        if (resMenuInfoUpdate.data.success) {
          resolve(resMenuInfoUpdate.data);
          
        } else {
          console.log('실패 > ',resMenuInfoUpdate.data.msg)
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
