import { userLoginI } from './../models/UserLoginI';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(){
    if(localStorage.getItem('ACCESS_TOKEN')){
      this.router.navigateByUrl("/home");
    };
  }

  onLogin(form: {value: any}): void{
    this.authService.login(form.value.email, form.value.password).subscribe( data => {
      localStorage.setItem("EMAIL", String(form.value.email));
      this.router.navigateByUrl("/home");
    });
  };


};
