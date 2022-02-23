import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model : any = {};
  photoUrl!: string;

  constructor(public authService: AuthService, private alertify:AlertifyService, private router: Router) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe( photoUrl =>
      this.photoUrl = photoUrl);
  }

  login()
  {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success("logged in successfully");
      
    }, error => {
      this.alertify.error(error);
    },
    () => {
      this.router.navigate(['/members']);
    });
  }


  loggedIn(){
    // const token = localStorage.getItem('token');
    // return !!token; // return false if null otherwise true

    return this.authService.loggedIn();
  }

  logout()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    // this.authService.currentUser  = null; // not working
    this.authService.currentUser = <User>{};

    this.alertify.message('logged out');
    this.router.navigate(['/home']);

  }



}
