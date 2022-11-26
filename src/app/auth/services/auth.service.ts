import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from '../models/user';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userData:User;

  constructor(private authService: AngularFireAuth, private router:Router) {
    this.authService.authState.subscribe((auth) => {
      if(auth){
        debugger;
        this.parseFromFirebase(auth);
        localStorage.setItem('user', this.toAny(auth))
      }
      else{
        localStorage.setItem('user', null)
      }
    })
  }

  public async logIn(email:string, password:string):Promise<void>{
    await this.authService.signInWithEmailAndPassword(email, password).then(res => {
      this.parseFromFirebase(res.user);
      localStorage.setItem('user', JSON.stringify(this.userData));
    })
  }

  public async logOut():Promise<void>{
    await this.authService.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }

  public async createUser(email:string, password:string):Promise<void>{
    if(email !== "" || email !== null)
      await this.authService.createUserWithEmailAndPassword(email, password).then(res => {
        this.parseFromFirebase(res.user);
        localStorage.setItem('user', JSON.stringify(this.userData));
      });
  }

  public getUserData():User{
    return JSON.parse(localStorage.getItem('user'));
  }

  private parseFromFirebase(user: firebase.User){
    this.userData.uid = user.uid;
    this.userData.email = user.email;
}

  private toAny(user:firebase.User):any{
    return { 
        uid: user.uid,
        email: user.email,
    }
}
}
