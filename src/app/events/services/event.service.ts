import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Event } from '../models/event'

@Injectable({
  providedIn: 'root'
})
export class EventService {

  dbEvent: Observable<Event[]>;

  constructor(private db:AngularFireDatabase ) 
  { 
    this.dbEvent = this.getAllEvents();
  }

  public getAllEvents():Observable<Event[]>{
    return this.db.list<Event>('event').valueChanges();
  }

  public getEvent(key:string){
    return this.db.list<Event>('event' + key).valueChanges();
  }

  public createEvent(event:Event):void{
    this.db.list('event').push(event);
  }

  public updateEvent(key:string, event:Event):void{
    this.db.list('event').update(key, event);
  }

  public deleteEvent(key:string):void{
    this.db.object(`/event/${key}`).remove();
  }
}
