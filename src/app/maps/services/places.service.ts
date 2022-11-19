import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { PlacesObjectModel } from '../models/PlacesModel';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private http: HttpClient) { }

   getPlace(address:string): Observable<PlacesObjectModel>{
      return this.http.get<PlacesObjectModel>(`api/maps`, { params: { street: address } });
      
  }
}
