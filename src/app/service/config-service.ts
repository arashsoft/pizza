import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ConfigService {
  config = {
    'serverUrl': 'http://54.237.191.160/MealsyOnlineOrderingServices/api/v1'
  };

  getConfig() {
    return this.config;
  }

}
