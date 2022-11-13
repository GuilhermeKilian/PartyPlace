import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GoogleMap } from '@capacitor/google-maps';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  apiKey:string = environment.agmKey;

  constructor() { }

  async buildMap(lat:number, lng:number, zoom:number = 8) : Promise<void>{

    const mapRef = document.getElementById('map');

    await GoogleMap.create({
      id: 'my-map', // Unique identifier for this map instance
      element: mapRef, // reference to the capacitor-google-map element
      apiKey: this.apiKey, // Your Google Maps API Key
      config: {
        center: {
          // The initial position to be rendered by the map
          lat: lat,
          lng: lng,
        },
        zoom: zoom, // The initial zoom level to be rendered by the map
      },
    });    
  }
}
