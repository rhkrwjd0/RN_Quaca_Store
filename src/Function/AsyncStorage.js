import AsyncStorage from '@react-native-community/async-storage';

// AsyncStorage 저장
export const setAsyncStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (err) {
    return err;
  }
};

// AsyncStorage 값 가져오기
export const getAsyncStorage = async (key) => {
  try {
    const _value = await AsyncStorage.getItem(key);
    if (_value !== null) {
      console.log(key + ' getAsyncStorage 완료');
      return {success: true, value: _value};
    } else {
      console.log(key + ' AsyncStorage 값이 없어요!');
      return {success: true, value: null};
    }
  } catch (err) {
    alert(key + 'getAsyncStorage 에러 : ', err);
    return {success: false, msg: err};
  }
};

// AsyncStorage 삭제
export const removeAsyncStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (err) {
    return err;
  }
};
