import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Event } from '../models/event'
import { CreateEvent } from '../models/createEvent';

@Injectable({
  providedIn: 'root'
})

export class EventService {

  constructor(private db:AngularFireDatabase ) {}

  public getAllEvents():Observable<Event[]>{
    return this.db.list<Event>('event').valueChanges();      
  }

  public getPersonalEvents(): Event[]{
    let events: Event[] = Array<Event>();
    this.db.list<Event>('event').snapshotChanges().subscribe(snap => snap.forEach(s => events.push(this.convertToEvent(s))));
    return events;
  }

  public getEventByKey(key:string):Event{
    let event:Event;
    this.db.object<Event>(`event/${key}`).snapshotChanges().subscribe(snap => { event = this.convertToEvent(snap) })
    return event;
  }

  public createEvent(event:CreateEvent):void{
    this.db.list('event').push(event);
  }

  public updateEvent(key:string, event:Event):void{
    this.db.list('event').update(key, event);
  }

  public deleteEvent(key:string):void{
    this.db.object(`event/${key}`).remove();
  }

  private convertToEvent(snap: SnapshotAction<Event>): Event{
    let event:Event = new Event();
    const values = snap.payload.val();
      event.address = values.address;
      event.details = values.details;
      event.key = snap.key;
      event.latitude = values.latitude;
      event.longitude = values.longitude;
      event.name = values.address;
      return event;
  }
}
