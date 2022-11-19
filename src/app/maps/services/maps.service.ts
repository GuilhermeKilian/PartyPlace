import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { Geolocation, Geoposition } from '@awesome-cordova-plugins/geolocation/ngx';
import { EventService } from 'src/app/events/services/event.service';
import { EventModel } from '../../events/models/event'
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { HttpResponse } from '@capacitor/core';
import { HTTPResponse } from '@awesome-cordova-plugins/http';
import { MarkerClickCallbackData } from '@capacitor/google-maps/dist/typings/definitions';

@Injectable({
  providedIn: 'root'
})

export class MapsService {
  public event:EventModel;
  public isModalOpen:boolean = false;
  private maps: GoogleMap;

  constructor(private geolocation:Geolocation, private eventService:EventService) { }

  async createMap(elementName:string):Promise<GoogleMap> {
    const mapRef = document.getElementById(elementName);
    let position:Geoposition = await this.geolocation.getCurrentPosition();
    let mp =  this.maps = await GoogleMap.create({
      id: 'party-place',
      element: mapRef,
      apiKey: environment.agmKey,
      config: {
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        zoom: 17,
      },
    });
    await this.maps.enableClustering();

    await this.maps.setOnMarkerClickListener((data) => {
      this.eventService.getEventByName(data.title).then(value => {      
        value.forEach(v => {
          this.event = <EventModel>v.val()
        })
      })
      this.setOpen(true);
    })

    return mp;
  }

  async addMarkers(){
    this.eventService.getAllEvents().subscribe(res => {
      const markers:Marker[] = new Array<Marker>;
      res.forEach(event => {
        let marker: Marker = {
          coordinate: {
            lat: parseFloat(event.latitude.toString()),
            lng: parseFloat(event.longitude.toString()),
          },
          title: event.name,
          snippet: event.details,
          //iconUrl: "https://i.pinimg.com/736x/a7/55/21/a7552158fd78bc1caac20e1a1a4569f6.jpg"
        };
        markers.push(marker);
        // this.maps.addMarker(marker);
      })
      this.maps.addMarkers(markers);
    });
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
