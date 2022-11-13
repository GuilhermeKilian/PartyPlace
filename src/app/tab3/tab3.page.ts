import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { EventService } from '../events/services/event.service';
import { Event } from '../events/models/event'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public events: Observable<Event[]>;
  public event: Event;

  constructor(private eventService:EventService) {
    this.events = eventService.getAllEvents()
  }

  create(event:Event){
    this.eventService.createEvent(event);
  }

  update(key:string, event:Event){
    this.eventService.updateEvent(key, event);
  }

  delete(key:string){
    this.eventService.deleteEvent(key);
  }
}
