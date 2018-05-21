import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  constructor() { }
  readonly config_data = {
    GENERAL_CONFIG: {
      'APP_NAME': 'LAVA',
      'APP_VERSION': 'v2.27',
      'APP_ID': '26',
      'API_ACCESS_KEY': 'Bearer ee6308b0-1ed7-454d-9662-954ca175a4c4',
      'SERVICE_URL': ' https://devcc.lava.ai/LavaMarketer/api/v1/',
      'TEAM_NAME': 'kings', // kings,bulls,...
      'LANDING_PAGE': 'home' //falcons and home
    },
    REALTIME_CONFIG: {
      'ANALYTICS_APP_ID': '1', // ADD APP ID OF THE ANALYTICS APP(LAVA DEMO APP)
      'INTERVAL': '10', // seconds
      'SATISFICATION_INTERVAL': '30', // seconds
      'INCIDENT_INTERVAL': '30', // seconds
      'MAP_THRESHOLD': 0,
      'ANALYTICS_INTERVAL': '30' // seconds
    },
    APP_CONFIG: {
      '0': {
        'app_name': 'Lava Demo App',
        'app_id': '1'
      },
      '1': {
        'app_name': 'Lava Demo App',
        'app_id': '2'
      },
      '2': {
        'app_name': 'Lava Demo App',
        'app_id': '3'
      }
    }
  }

}
