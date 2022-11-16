import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { MapsService } from '../maps/services/maps.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Geoposition } from '@awesome-cordova-plugins/geolocation';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  
})
export class Tab2Page {
    newMap: GoogleMap;

    constructor(private maps:MapsService, private geolocation:Geolocation) {}

    async summonMap(){
      this.newMap = await this.maps.createMap('map')
    }
}