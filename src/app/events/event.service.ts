import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from '@firebase/util';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  dbEvent: Observable<Event>;

  constructor(private db:AngularFireDatabase ) { }

  public getEvents(){
    return this.db.list('event')
      .snapshotChanges()
      .pipe(
        map(changes => 
        {
          return changes.map(c => new Event{
              key: c.payload.key;
              name: c.payload.val().name;
              longitude: c.payload.val().longitude;
              latitude: c.payload.val().latitude;
              address: c.payload.val().address;
              details: c.payload.val().details;
        });
    }));

    Event event = new Event{
      
    }

    }
  }

  public createEvent(event:Event):void{
    this.db.list('event').push(event);
  }

  public updateEvent(key:string, event:Event):void{
    this.db.list('event').update('key', event);
  }

  public deleteEvent(key:string):void{
    this.db.object(`/event/${key}`).remove();
  }
}
