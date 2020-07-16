import request from 'request';
import config from '../config';
// import Logger from '../loaders/logger';
import { BaseProvider } from './BaseProvider';
import xml2js, { Parser } from 'xml2js';

export interface PetRegisterData {
  registerNumber: string;
  rfidCode: string;
  breed: string;
  isNeutered: boolean;
  gender: string;
}

export class PetProvider extends BaseProvider {
  private xmlParser: xml2js.Parser;
  constructor() {
    super();
    this.xmlParser = new Parser();
  }

  //TODO: error handling
  public async getRegisterPetData(rfidCode: string) {
    const petRequestUrl = `http://openapi.animal.go.kr/openapi/service/rest/animalInfoSrvc/animalInfo?rfid_cd=${rfidCode}&ServiceKey=${config.auth.openApi}`;
    return new Promise<PetRegisterData>((resolve, reject) => {
      request.get({ url: petRequestUrl }, (err, res) => {
        this.xmlParser.parseString(res.body, (err: any, result: string) => {
          const jsonData = JSON.stringify(result);
          const bodyData = JSON.parse(
            JSON.stringify(JSON.parse(jsonData)['response']['body'][0]['item'])
          )[0];
          const response: PetRegisterData = {
            registerNumber: bodyData['dogRegNo'][0],
            rfidCode: bodyData['rfidCd'][0],
            breed: bodyData['kindNm'][0],
            isNeutered: bodyData['neuterYn'][0] === '중성' ? true : false,
            gender: bodyData['sexNm'][0] === '수컷' ? 'male' : 'female',
          };
          console.log(40, response);
          resolve(response);
        });
      });
    });
  }
}
