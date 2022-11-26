import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { EventModel } from '../models/event'
import { CreateEvent } from '../models/createEvent';
import { DataSnapshot } from '@angular/fire/compat/database/interfaces';
import { environment } from 'src/environments/environment';
import { get } from 'scriptjs';

@Injectable({
  providedIn: 'root'
})

export class EventService {

  html:HTMLDivElement;
  placeService:google.maps.places.PlacesService;

  constructor(private db:AngularFireDatabase) {
    get(`https://maps.googleapis.com/maps/api/js?key=${environment.agmKey}&libraries=places`, () => {
      this.html = document.createElement('div') as HTMLDivElement;
      this.placeService = new google.maps.places.PlacesService(this.html);
     });
  }

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

    this.placeService.findPlaceFromQuery({
      fields: [ "formatted_address", "name", "geometry" ] ,
      query: event.address,
      language: null,
      locationBias: null,
    }, (response, status) => {
      if(status === google.maps.places.PlacesServiceStatus.OK){
        event.latitude = response[0].geometry.location.lat();
        event.longitude = response[0].geometry.location.lng();
        this.db.list('event').push(event);
      }        
    });
  }

  public updateEvent(key:string, event:CreateEvent):void{

    this.placeService.findPlaceFromQuery({
      fields: [ "formatted_address", "name", "geometry" ] ,
      query: event.address,
      language: null,
      locationBias: null,
    }, (response, status) => {
      if(status === google.maps.places.PlacesServiceStatus.OK){
        event.latitude = response[0].geometry.location.lat();
        event.longitude = response[0].geometry.location.lng();
        this.db.list('event').update(key, event);
      }        
    })
  }

  public deleteEvent(key:string):void{
    this.db.object(`event/${key}`).remove();
  }
}
