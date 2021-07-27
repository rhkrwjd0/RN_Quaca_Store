import {setAsyncStorage, getAsyncStorage, removeAsyncStorage} from '../AsyncStorage';

export const setUserInfo = (userInfo) => {
    return new Promise((resolve, reject) => {
        setAsyncStorage('user', JSON.stringify([userInfo])).then((resSet) => {
            if (resSet) {
                console.log('user AsyncStorage 저장 완료');
                resolve(resSet);
            } else {
                console.log('user AsyncStorage 저장 실패 : ', resSet);
                reject(resSet);
            }
        });
    });
}

export const getUserInfo = () => {
    return new Promise((resolve, reject) => {
        getAsyncStorage('user').then((resGet) => {
            if (resGet.success) {
                resolve(resGet);
                //resolve(JSON.parse(resGet.value));
            } else {
                reject(resGet.msg);
            }
        });
    })
}


export const removeUserInfo = () => {
    return new Promise((resolve, reject) => {
        removeAsyncStorage('user').then((resGet) => {
            console.log("로그아웃",resGet)
            if (resGet) {
                resolve(resGet);
                //resolve(JSON.parse(resGet.value));
            } else {
                reject(resGet.msg);
            }
        });
    })
}