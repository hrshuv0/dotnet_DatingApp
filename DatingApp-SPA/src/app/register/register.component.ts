import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  @Output() cancelRegister = new EventEmitter();

  model: any = {}

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }


  register() {
    console.log(this.model);
    this.authService.register(this.model).subscribe(() => {
      console.log('registration successful');
    }, error =>{
      console.log(error);
    });
  }

  cancel() {
    console.log("cancelled");
    this.cancelRegister.emit(false);
  }


}
