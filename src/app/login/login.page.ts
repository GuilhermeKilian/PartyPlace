import { AuthService } from '../auth/services/auth.service';
import { User } from '../auth/models/user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  @ViewChild('slides') slides: IonSlides;
  public wavesPosition: number = 0;
  public wavesDifference: number = 80;
  public userLogin: User = {
    uid: '',
    email: '',
    displayName: ''
  };  //iniciar o User como um objeto vazio
  public userRegister: User = {
    uid: '',
    email: '',
    displayName: ''
  };
  AuthService: any;

  constructor(
    public authService: AuthService ) { }

  ngOnInit() {
  }


    slideOpts = {
      initialSlide: 1,
      speed: 400
    };

  segmentChanged(event: any) {

    if (event.detail.value === "login") {
      this.slides.slidePrev();
      this.wavesPosition += this.wavesDifference;
    } else {
      this.slides.slideNext();
      this.wavesPosition -= this.wavesDifference;
    }
  }

  async login(){
    try{
    await this.AuthService.login(this.userLogin);
  } catch(error){
    console.error(error);
  }
  };

  async register(){
    try{
      await this.AuthService.register(this.userRegister);
    }catch(error){
    console.error(error);
    }
  };
};

