import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('', [Validators.required,]),
    //TODO: fix confirmation password and password validation
    // - why isn't it writes out the other error message at less than 4 char?

  });

  hide = true;
  get usernameInput() { return this.loginForm.get('username'); }
  get passwordInput() { return this.loginForm.get('password'); }

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.warn(this.loginForm.value);
  }

  onGoogleLoginClicked() {
    console.warn("Google log in happened!")
  }

  onGoogleRegisterClicked() {

  }
}
