import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GoogleMap } from '@capacitor/google-maps';
import { Geolocation, Geoposition } from '@awesome-cordova-plugins/geolocation/ngx';
@Injectable({
  providedIn: 'root'
})

export class MapsService {
  
  constructor(private geolocation:Geolocation) { }

  async createMap(elementName:string):Promise<GoogleMap> {
    const mapRef = document.getElementById(elementName);
    let position:Geoposition = await this.geolocation.getCurrentPosition();
    return GoogleMap.create({
      id: 'my-cool-map',
      element: mapRef,
      apiKey: environment.agmKey,
      config: {
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        zoom: 15,
      },
    });
  }
}
