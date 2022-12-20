// import { ProductsI } from './models/ProductsI';
// import { ProductsGetI } from './models/productsGetI';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtResponseI } from './models/JwtResponse';
import { Observable, tap } from 'rxjs';
import { UserCreateI } from './models/userCreateI';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) { }
  userId?: string;
  token?: string;
  refreshToken?: string | null;
  AUTH_SERVER: string = "http://149.102.141.74:3000/api/v1/";

  private saveToken(token: string, refreshToken: string): void{
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("REFRESH_TOKEN", refreshToken);
    console.log( "exito ", token );
    this.token=token;
  };
  getUserId(){
    this.httpClient.get("http://149.102.141.74:3000/api/v1/users/?paginator=true").subscribe(data => {
      Object.entries(data).forEach(element => {
        for(let i of element){
          for(let  j in i){
            // console.log(String(i[j]['id']));
            // console.log("local", String(localStorage.getItem('EMAIL')));
            if(String(i[j]['email']) === String(localStorage.getItem('EMAIL'))){
              console.log(i[j]['id']);
              this.userId = String(i[j]['id']);
            };
          };
        };
      });
    });
  };
  getToken(): string{
    if(!this.token){
      this.token = localStorage.getItem("ACCESS_TOKEN")!;
      this.refreshToken = localStorage.getItem("REFRESH_TOKEN");
    };
    return this.token;
  };

  login(email: string, password: string): Observable<JwtResponseI>{
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}users/login`,
    {email, password}).pipe(tap(
      (res: JwtResponseI) => {
        if (res){
          // guardar token
          this.saveToken(res.accessToken, res.refreshToken);
        };
      },
    ));
  };
  getProducts(){
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application-json",
        Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        mode: 'no-cors'
        // "Cookie": `id_user=${this.userId}; refresh_token=${localStorage.getItem("REFRESH_TOKEN")}`
      }),
    };
    console.log(localStorage.getItem('ACCESS_TOKEN'));
    // console.log('token', localStorage.getItem('REFRESH_TOKEN'));
    // console.log('id',this.userId);
    return this.httpClient.get(`${this.AUTH_SERVER}product`, httpOptions);
  };
  logout(): void {
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");
  };

};
