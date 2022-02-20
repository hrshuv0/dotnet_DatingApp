import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode = false;
 

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
    
  }

  registerToggle(){
    this.registerMode = true;
  }
  
  loggedIn(){
    // const token = localStorage.getItem('token');
    // return !!token; // return false if null otherwise true

    return this.authService.loggedIn();
  }
  

  cancelRegisterMode(registerMode: boolean)
  {
    this.registerMode = registerMode;

  }


}
