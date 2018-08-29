import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ConfigService} from './config-service';
import {FoodProvider} from '../model/foodProvider';
import {ReplaySubject} from 'rxjs/internal/ReplaySubject';
import {Observable} from 'rxjs/internal/Observable';
import {ActivatedRoute} from '@angular/router';

@Injectable({providedIn: 'root'})
export class FoodProviderService {
  public foodProvider: FoodProvider;
  private cache$ = new ReplaySubject<FoodProvider>(1);
  // Company Id
  private cid: string;
  // Business Id
  private bid: string;

  //  const cid = '08d5f8c8-c1d3-faf0-d56b-af5da237c05a';
  //  const bid = '08d5f8c8-f9cb-716e-6872-d74a582e3e4b';

  constructor(private http: HttpClient, private configService: ConfigService, private ar: ActivatedRoute) {
  }

  getFoodProvider(): Observable<FoodProvider> {
    if (this.bid && this.cid) {
      return this.doGetFoodProvider();
    } else {
      return new Observable((observer) => {
        this.ar.queryParams.subscribe(params => {
          this.cid = params.cid;
          this.bid = params.bid;
          this.doGetFoodProvider().subscribe(foodProvider => {
            observer.next(foodProvider);
            observer.complete();
          });
          return {unsubscribe() {}};
        });
      });
    }
  }

  private doGetFoodProvider(): Observable<FoodProvider> {
    if (!this.cache$.observers.length) {
      let params = new HttpParams();
      params = params.append('companyId', this.cid);
      params = params.append('businessId', this.bid);

      this.http.get(this.configService.getConfig().serverUrl + `/Companies/${this.cid}`, {params: params}).subscribe(
        data => {
          // @ts-ignore: this is backend foodProvider Object
          const fpObject = data.Businesses[0].Foodprovider;
          this.foodProvider = new FoodProvider(fpObject);
          this.cache$.next(this.foodProvider);
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
