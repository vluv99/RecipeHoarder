import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AuthService} from "../../services/auth-service";
import FormValidation from "../../utils/FormValidation";
import {Router} from "@angular/router";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {


    registerForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z\ ]+$')]),
        username: new FormControl('', [Validators.required, Validators.minLength(4)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        gender: new FormControl('', [Validators.required]),
        birthDate: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required, Validators.min(4)]),
        password2: new FormControl('', [Validators.required])
    },
        {
            validators: [FormValidation.compare('password', 'password2')]
        });

    // password show/hide variables
    hide = true;
    hide2 = true;

    genders: String[] = ['male', 'female', 'other'];
    selectedValue: string | undefined;

    constructor(public authService: AuthService, public router: Router) {
    }

    register(){
        this.authService.register(
            this.registerForm.value.email,
            this.registerForm.value.password,
            this.registerForm.value).then(() =>{
            this.router.navigate(['/']);
        })
    }

    matchPassword(control: AbstractControl): ValidationErrors | null {
        let password = this.registerForm.get('password')?.value;
        let confirm = this.registerForm.get('password2')?.value;

        if (password != confirm) {
            return {'noMatch': true}
        }

        return null
    }

    ngOnInit(): void {
    }

    onSubmit() {
        if(this.registerForm.valid){
            //alert('User form is valid!!')
            this.register();
        } else {
            //alert('User form is not valid!! @@@@@')
        }

        console.warn(this.registerForm.value);
    }

    isFieldMissing(fieldName: string){
        return this.registerForm.get(fieldName)?.errors?.required;
    }

    /**
     * Check which error you get from the field.
     * It gives back true when theres and error and that isnt "required".
     * @param fieldName
     */
    isFieldInvalidNotMissing(fieldName: string):boolean{
        const errors = this.registerForm.get(fieldName)?.errors

        if (errors == null){
            return false;
        }

        return !('required' in errors);
    }
}
