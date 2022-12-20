import { HttpClient } from '@angular/common/http';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  AUTH_SERVER: string = "http://149.102.141.74:3000/api/v1/";
  products?: any = [];
  constructor(private authService: AuthService) {}

  ngOnInit(){
    this.authService.getUserId();
  };

  onLogOut(){
    this.authService.logout();
  };

  productsButton(){
    this.authService.getProducts().subscribe(data => {
      console.log(data);
    });
  };

}
