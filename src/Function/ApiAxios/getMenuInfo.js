import axios from 'axios';
import {nowUrl} from '../../UrlAddress';

export const getMenuInfo = (storeId, menuId, commonUrl) => {
  return new Promise((resolve, reject) => {
    // const url = `${nowUrl().express}users/menuInfo`;
    const url = `${commonUrl.express}menu/menuInfo`;
    console.log("=======",storeId, menuId)
    const param = {
      StoreId: storeId,
      MenuId : menuId
    };
    console.log('url > ',url)
    axios
      .post(url, param)
      .then((resMenu) => {
        console.log(resMenu)
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
