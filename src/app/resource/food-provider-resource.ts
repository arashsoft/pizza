import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ConfigService} from '../service/config-service';
import {FoodProvider} from '../model/foodProvider';
import {ReplaySubject} from 'rxjs/internal/ReplaySubject';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({providedIn: 'root'})
export class FoodProviderResource {
  private cache$ = new ReplaySubject<FoodProvider>(1);

  constructor(private http: HttpClient, private configService: ConfigService) {
  }

  getFoodProvider(): Observable<FoodProvider> {
    // TODO: read from url
    const companyId = '08d5f8c8-c1d3-faf0-d56b-af5da237c05a';
    const businessId = '08d5f8c8-f9cb-716e-6872-d74a582e3e4b';


    if (!this.cache$.observers.length) {
      let params = new HttpParams();
      params = params.append('companyId', companyId);
      params = params.append('businessId', businessId);

      this.http.get(this.configService.getConfig().serverUrl + `/Companies/${companyId}`, {params: params}).subscribe(
        data => {
          // @ts-ignore: this is backend foodProvider Object
          const fpObject = data.Businesses[0].Foodprovider;
          this.cache$.next(new FoodProvider(fpObject));
          return this.cache$;
        },
        error => {
          this.cache$.error(error);
          // Recreate the Observable as after Error we cannot emit data anymore
          this.cache$ = new ReplaySubject(1);
        }
      );
    }
    return this.cache$;
  }
}
