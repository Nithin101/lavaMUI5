import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  constructor() { }
  readonly APP_CONFIG: any = {
    '0': {
      'app_name': 'Lava Demo App',
      'app_id': '1'
    }
  };

}
