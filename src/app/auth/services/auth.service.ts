import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:any;
  constructor(
    private authService: AngularFireAuth, 
    private router:Router) {
    this.authService.authState.subscribe((auth) => {
      if(auth){
        this.userData = auth;
        localStorage.setItem('user', this.userData)
      }
      else{
        localStorage.setItem('user', null)
      }
    })
  }

  public async logIn(email:string, password:string){
    return this.authService.signInWithEmailAndPassword(email, password).then(res =>{
      this.userData = res.user;
      localStorage.setItem('auth', JSON.stringify(this.userData));
    })
  }

  public async logOut():Promise<void>{
    return this.authService.signOut().then(() => {
      localStorage.removeItem('auth')
      this.router.navigate(['home'])
    })
  }

  public createUser(email:string, password:string):void{
    if(email !== "" || email !== null)
      this.authService.createUserWithEmailAndPassword(email, password);
  }

  public getUserData():User{
    return JSON.parse(localStorage.getItem('auth'));
  }
}
