import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EventModel } from '../models/event'
import { CreateEvent } from '../models/createEvent';
import { PlacesService } from '../../maps/services/places.service'
import { DataSnapshot } from '@angular/fire/compat/database/interfaces';

@Injectable({
  providedIn: 'root'
})

export class EventService {

  constructor(private db:AngularFireDatabase, private place: PlacesService) {}

  public getSavedEvents():Observable<EventModel[]>{
    return this.db.list<EventModel>('saved').valueChanges();      
  }

  public saveEvent(event:EventModel){
    this.db.list<EventModel>('saved').push(event);
  }

  public deleteSaveEvent(key:string):void{
    this.db.object(`saved`).query.orderByChild('key').equalTo(key).limitToFirst(1).get().then(event => {
      let keys = Object.keys(event.val())
      this.db.object(`saved/${keys[0]}`).remove();
    });
  }

  public getSavedEventByKeyAndName(uid:string, keyEvent:string):Promise<DataSnapshot>{    
    return this.db.object<EventModel>(`saved`).query.orderByChild('key').equalTo(keyEvent).limitToFirst(1).get()
  }

  public getAllEvents():Observable<EventModel[]>{
    return this.db.list<EventModel>('event').valueChanges();      
  }

  public getPersonalEvents(): Observable<SnapshotAction<EventModel>[]>{
    return this.db.list<EventModel>('event').snapshotChanges();
  }

  public getEventByKey(key:string):Observable<SnapshotAction<EventModel>>{
    return this.db.object<EventModel>(`event/${key}`).snapshotChanges()
  }

  public getEventByName(name:string):Promise<DataSnapshot>{
    return this.db.object<EventModel>(`event`).query.orderByChild('name').equalTo(name).get();
  }

  public createEvent(event:CreateEvent):void{
    this.place.getPlace(event.address).subscribe(place => {
      event.latitude = place.candidates[0].geometry.location.lat;
      event.longitude = place.candidates[0].geometry.location.lng;
      this.db.list('event').push(event);
    })
  }

  public updateEvent(key:string, event:CreateEvent):void{
    this.place.getPlace(event.address).subscribe(place => {
      event.latitude = place.candidates[0].geometry.location.lat;
      event.longitude = place.candidates[0].geometry.location.lng;
      this.db.list('event').update(key, event);
    })
  }

  public deleteEvent(key:string):void{
    this.db.object(`event/${key}`).remove();
  }

  private convertToEvent(snap: SnapshotAction<EventModel>): EventModel{
    let event:EventModel = new EventModel();
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
