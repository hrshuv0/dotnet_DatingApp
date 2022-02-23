import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  @Output() cancelRegister = new EventEmitter();

  model: any = {}
  registerForm!: FormGroup;
  bsConfig!: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService,
    private alertify: AlertifyService, private fb: FormBuilder) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    },

      this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: new FormControl('', Validators.required)
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: AbstractControl) {
    return g.get('password')!.value === g.get('confirmPassword')!.value ? null : { 'mismatch': true };
  }


  register() {
    // this.authService.register(this.model).subscribe(() => {
    //   this.alertify.success('registration successful');
    // }, error =>{
    //   this.alertify.error(error);
    // });

    console.log(this.registerForm.value);





  }

  cancel() {
    console.log("cancelled");
    this.cancelRegister.emit(false);
  }


}
