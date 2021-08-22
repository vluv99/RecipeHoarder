import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {


  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('',[Validators.minLength(4), Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required ]),
    gender: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.min(4) ]),
    password2: new FormControl('', [Validators.required]),
    //TODO: fix confirmation password and password validation
    // - why isn't it writes out the other error message at less than 4 char?

  });


  hide = true;
  get nameInput() { return this.registerForm.get('name'); }
  get usernameInput() { return this.registerForm.get('username'); }
  get emailInput() { return this.registerForm.get('email'); }
  get genderInput() { return this.registerForm.get('gender'); }
  get birthDateInput() { return this.registerForm.get('birthDate'); }
  get passwordInput() { return this.registerForm.get('password'); }
  get password2Input() { return this.registerForm.get('password2'); }


  genders: String[] = ['male', 'female', 'other'];
  selectedValue: string | undefined;

  constructor() { }

  matchPassword(control: AbstractControl): ValidationErrors | null {
    let password = this.registerForm.get('password')?.value;
    let confirm = this.registerForm.get('password2')?.value;

    if (password != confirm) { return { 'noMatch': true } }

    return null
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.warn(this.registerForm.value);
  }
}
