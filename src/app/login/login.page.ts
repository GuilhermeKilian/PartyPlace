import { AuthService } from '../auth/services/auth.service';
import { User } from '../auth/models/user';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  @ViewChild('slides') slides: ElementRef;
  public wavesPosition: number = 0;
  public wavesDifference: number = 80;
  public userLogin: User;
  public userRegister: User;

  constructor(private authService: AuthService ) {
    this.userLogin = { uid: '', email: '', password: '', }
    this.userRegister = { uid: '', email: '', password: '', }
  }

  ngOnInit() {
  }

  segmentChanged(event: any) {
    if (event.detail.value === "login") {
      this.slides.nativeElement.slidePrev();
      this.wavesPosition += this.wavesDifference;
    } else {
      this.slides.nativeElement.slideNext();
      this.wavesPosition -= this.wavesDifference;
    }
  }

  async login(){
    debugger;
    try{
    await this.authService.logIn(this.userLogin.email, this.userLogin.password);
  } catch(error){
    console.error(error);
  }
  };

  async register(){
    try{
      await this.authService.createUser(this.userRegister.email, this.userRegister.password);
    }catch(error){
    console.error(error);
    }
  };
};

