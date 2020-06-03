import request from 'request';
import config from '../config';
// import Logger from '../loaders/logger';
import { BaseProvider } from './BaseProvider';

export class PetProvider extends BaseProvider {
  public async getRegisterPetData(regNumber: string, rfidCode: string) {
    const petRequestUrl = `http://openapi.animal.go.kr/openapi/service/rest/animalInfoSrvc/animalInfo?ServiceKey=${config.auth.openApi}&dog_reg_no=${regNumber}&rfid_cd=${rfidCode}`;
    return new Promise<string>((resolve, reject) => {
      request.get({ url: petRequestUrl }, (err, res) => {
        console.log(13, JSON.parse(JSON.stringify(res)));
      });
    });
  }
}
