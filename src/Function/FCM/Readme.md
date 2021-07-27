# FCM 알림

- npm: https://www.npmjs.com/package/@react-native-firebase/messaging
- 참고1: https://velog.io/@mayinjanuary/React-Native-Firebase-%EB%A1%9C-%ED%91%B8%EC%89%AC-%EC%95%8C%EB%A6%BC-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-%EC%95%88%EB%93%9C%EB%A1%9C%EC%9D%B4%EB%93%9C-%EC%84%B8%ED%8C%85
- 참고2: https://dev-yakuza.posstree.com/ko/react-native/react-native-firebase-fcm/
- 참고3: https://velog.io/@mayinjanuary/React-Native-Firebase-%EB%A1%9C-%ED%91%B8%EC%89%AC-%EC%95%8C%EB%A6%BC-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-2-IOS-%EC%95%B1-%EC%84%B8%ED%8C%85%ED%95%98%EA%B8%B0
- 참고4: https://github.com/invertase/react-native-firebase/issues/4195
- 참고5: https://romeoh.tistory.com/entry/React-Native-Firebase-Push-Notification-%EC%B6%94%EA%B0%80-Android

### firebase
디버그 SHA1 : keytool -list -v -alias androiddebugkey -keystore C:\Users\user\Documents\GitHub\Tera_RN_Quaca_Store\android\app\debug.keystore 

### fcm token 만료상황

FCM Token은 만료되지 않으나, 특정 상황에서 Refresh 됨

1. App deletes Instance ID
2. App is restored on a new device
3. User uninstalls/reinstall the app
4. User clears app data