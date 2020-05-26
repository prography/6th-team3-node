import request from 'request';
import config from '../config';
// import Logger from '../loaders/logger';
import { BaseProvider } from './BaseProvider';

export interface UserToken {
  accessToken: string;
  refreshToken: string;
}

export interface UserInfo {
  id: number;
  nickname: string;
  profileImage: string;
  email: string;
}

export class KakaoProvider extends BaseProvider {
  public async getAccessToken(authorizedCode: string) {
    const headers = {
      'Content-type': 'application/x-www-form-urlencoded',
    };
    const kakaoRequestUrl = 'https://kauth.kakao.com/oauth/token';
    const requestBody = {
      grant_type: 'authorization_code',
      client_id: config.auth.kakao.clientId,
      redirect_uri: config.auth.kakao.redirect,
      code: authorizedCode,
    };
    console.log(22, requestBody);
    return new Promise<UserToken>((resolve, reject) => {
      request.post(
        { url: kakaoRequestUrl, form: requestBody, headers: headers },
        (err, res) => {
          //TODO: Error 처리하기
          /*
          if (err) {
            const name = 'Request Error';
            const description = err.description;
            reject(name);
          }
          if (res.statusCode !== 200) {
            // const name = snakelToSentence(res.body['error']);
            const name = res.body['error'];
            const description = res.body['error_description'];
            reject(name);
          }
          */
          const bodyData = JSON.parse(res.body);
          const response: UserToken = {
            accessToken: bodyData['access_token'],
            refreshToken: bodyData['refresh_token'],
          };
          // Logger.info(response);
          console.log(44, response);
          resolve(response);
        }
      );
    });
  }
  public async getUserInfo(userToken: UserToken) {
    const headers = {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      Authorization: `Bearer ${userToken.accessToken}`,
    };
    const kakaoRequestUrl = 'https://kapi.kakao.com/v2/user/me';
    return new Promise<UserInfo>((resolve, reject) => {
      request.get({ url: kakaoRequestUrl, headers: headers }, (err, res) => {
        //TODO: Error 처리하기
        const bodyData = JSON.parse(res.body);
        const response: UserInfo = {
          id: bodyData['id'],
          nickname: bodyData['properties']['nickname'],
          profileImage: bodyData['properties']['profile_image'],
          email: bodyData['kakao_account']['email'],
        };
        // Logger.info(response);
        console.log(78, response);
        resolve(response);
      });
    });
  }
}
