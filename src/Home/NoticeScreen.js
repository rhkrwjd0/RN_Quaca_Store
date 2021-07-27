import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Button,
    TextInput,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';

const NoticeScreen = () => {

    const [myToken, setMyToken] = useState(null)

    // 권한... 도대체 왜 허용하냐는 창은 안뜨고 혼자 허용이니...
    const fcmPermission = () => {
        messaging()
            .requestPermission()
            .then((authStatus) => {
                console.log('messaging > ', messaging.AuthorizationStatus);
                const enabled =
                    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
                if (enabled) {
                    messaging()
                        .getToken()
                        .then((token) => {
                            setMyToken(token)
                        });
                }
            });
    };

    useEffect(() => {
        fcmPermission()
    }, [])

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [token, setToken] = useState('');

    const oldPhone =
        'dPujRxDGQkCHgSs-MzKFGk:APA91bF4htoEqccnVtcrD1irzgcQU430gOkNZqoLYLAvjKmsOsY0ANaRHJnauZePv98hg7GslKileYADyapWVcvUHRrRVBqIXIzKGbmg1vUyzjydxjdjQf4DAuCn4ShuiXMjpxHvEKzQ';

    const sendNotice = () => {
        const url = 'http://teraenergy.iptime.org:10050/send';
        const params = {
            title: title,
            body: body,
            token: token,
        };
        console.log('알림시작');
        axios.post(url, params).then((resSend) => {
            console.log('resSend > ', resSend);
        }).catch((err) => {
            console.log('err > ', err)
        });
    };

    return (
        <SafeAreaView>
            <View style={styles.box}>
                <Text style={styles.topTxt}>알림보내기</Text>
                <Text>제목</Text>
                <TextInput
                    onChangeText={(text) => setTitle(text)}
                    style={styles.input}
                />
                <Text>내용</Text>
                <TextInput
                    onChangeText={(text) => setBody(text)}
                    style={styles.input}
                />
                <Button
                    title="옛날폰한테 알림보내기"
                    onPress={() => {
                        setToken(oldPhone);
                        sendNotice();
                    }}
                />
                <Text>내 토큰: {myToken}</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    box: {
        width: '90%',
        alignSelf: 'center',
    },
    topTxt: {
        fontSize: 20,
        textAlign: 'center',
        margin: 20,
    },
    input: {
        backgroundColor: '#F6F6F6',
        borderColor: '#D2D2D2',
        borderWidth: 1,
        borderStyle: 'solid',
        marginBottom: 10,
        borderRadius: 3,
        padding: 10,
    },
});

export default NoticeScreen;
