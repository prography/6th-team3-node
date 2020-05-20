import request from 'request';
import config from '../config';
import Logger from '../loaders/logger';
import { UserToken } from '../interfaces/AuthInterface';
import { KaKaoAuthError } from '../errors/AuthError';
import { CamelToSentence } from './BaseHelper';

function getKakaoUserToken(authorizedCode: string) {
  const headers = {
    'Content-type': 'application/x-www-form-urlencoded',
  };
  const kakaoRequestUrl = 'https://kauth.kakao.com/oauth/token';
  const requestBody = {
    grant_type: 'authorization_code',
    client_id: config.auth.kakaoKey,
    redirect_uri: config.auth.kakaoRedirect,
    code: authorizedCode,
  };

  return new Promise<UserToken>((resolve, reject) => {
    request.post(
      { url: kakaoRequestUrl, form: requestBody, headers: headers },
      (err, res) => {
        if (err) {
          const name = 'Request Error';
          const description = err.description;
          Logger.error(err);
          reject(new KaKaoAuthError(name, description));
        }
        // TODO: Error 처리하기
        if (res.statusCode !== 200) {
          const name = CamelToSentence(res.body['error']);
          const description = res.body['error_description'];
          Logger.error(res);
          reject(new KaKaoAuthError(name, description));
        }
        const response: UserToken = {
          accessToken: res.body.access_token,
          refreshToken: res.body.refresh_token,
        };
        resolve(response);
      }
    );
  });
  /*
  request.post(
    { url: kakaoRequestUrl, form: requestBody, headers: headers },
    (err, res, body) => {
      if (err) Logger.error(err);
      if (res.statusCode !== 200) {
        return 'error';
      }
      console.log(24, body);
      // const { access_token, refresh_token } = body;
      const responseBody: UserToken = {
        accessToken: body['access_token'],
        refreshToken: body['refresh_token'],
      };
      console.log(responseBody);
      return responseBody;
    }
  );
  */
}

export { getKakaoUserToken };
