import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { PlacesObjectModel } from './models/PlacesModel';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private http: HttpClient) { }

   getPlace(address:string): Observable<PlacesObjectModel>{
    return this.http.get<PlacesObjectModel>(
      `googlemap/maps/api/place/findplacefromtext/json?input=${address}}&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry`
      , {
        params: {
          input: address,
          inputtype: "textquery",
          fields: "formatted_address,name,geometry",
          key: environment.agmKey
        }
      });
      
  }
}
