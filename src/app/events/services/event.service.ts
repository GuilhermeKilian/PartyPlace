import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Event } from '../models/event'
import { CreateEvent } from '../models/createEvent';
import { PlacesService } from '../../maps/places.service'

@Injectable({
  providedIn: 'root'
})

export class EventService {

  constructor(private db:AngularFireDatabase, private place: PlacesService) {}

  public getAllEvents():Observable<Event[]>{
    return this.db.list<Event>('event').valueChanges();      
  }

  public getPersonalEvents(): Observable<SnapshotAction<Event>[]>{
    return this.db.list<Event>('event').snapshotChanges();
  }

  public getEventByKey(key:string):Observable<SnapshotAction<Event>>{
    return this.db.object<Event>(`event/${key}`).snapshotChanges()
  }

  public createEvent(event:CreateEvent):void{
    this.place.getPlace(event.address).subscribe(place => {
      debugger;
      event.latitude = place.candidates[0].geometry.location.lat;
      event.longitude = place.candidates[0].geometry.location.lng;
      this.db.list('event').push(event);
    })
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
      event.name = values.name;
      return event;
  }
}
