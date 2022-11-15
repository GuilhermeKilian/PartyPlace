import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { EventService } from '../events/services/event.service';
import { Event } from '../events/models/event'
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';


export interface EventForm{
    key: FormControl<string>;
    name: FormControl<string>;
    longitude: FormControl<number>;
    latitude: FormControl<number>;
    address: FormControl<string>;
    details: FormControl<string>;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  events: Event[];
  form:FormGroup;

  constructor(private eventService:EventService, private formBuilder: FormBuilder) {
    this.events = eventService.getPersonalEvents();
    this.form = this.initializeForm();
  }

  create(event:FormGroup){
    this.eventService.createEvent(event.value);
    this.initializeForm();
  }

  updateEvent(key:string, event:Event){
    this.eventService.updateEvent(key, event);
  }

  deleteEvent(key:string){
    this.eventService.deleteEvent(key);
  }

  initializeForm():FormGroup{
    return this.formBuilder.group<EventForm>({
      address: new FormControl('', {nonNullable: true}),
      details: new FormControl('', {nonNullable: false}),
      key: new FormControl('', {nonNullable: false}),
      latitude: new FormControl<number>(0, {nonNullable: true}),
      longitude: new FormControl<number>(0, {nonNullable: true}),
      name: new FormControl('', {nonNullable: true}),
    })
  }
}
