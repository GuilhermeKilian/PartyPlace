import { Component } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { PlacesService } from '../maps/places.service';
import { MapsService } from '../maps/services/maps.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  
})
export class Tab2Page {
    newMap: GoogleMap;

    constructor(private maps:MapsService, private places:PlacesService) {}

    ngOnInit(): void{
        this.summonMap();
        this.putMarkers();
    }
    async summonMap(){
      this.newMap = await this.maps.createMap('map')
    }

    async putMarkers(){
      this.maps.addMarkers();
    }
}