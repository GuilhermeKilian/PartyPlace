import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { EventModel } from '../events/models/event';
import { EventService } from '../events/services/event.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  savedEvents:Observable<EventModel[]>;

  constructor(private eventService:EventService) {}

  ngOnInit(){
    this.getSavedPlaces();
  }

  getSavedPlaces(){
    this.savedEvents = this.eventService.getSavedEvents();
  }

}
