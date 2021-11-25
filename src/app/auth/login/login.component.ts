import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth-service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required,]),
        //TODO: fix confirmation password and password validation
        // - why isn't it writes out the other error message at less than 4 char?

    });

    hide = true;

    constructor(public authService: AuthService, public router: Router) {
    }

    ngOnInit(): void {
    }

    onSubmit() {
        //console.warn(this.loginForm.value);
        this.authService.logIn(
            this.loginForm.value.email,
            this.loginForm.value.password)
            .then(() => {
                this.router.navigate(['/']);
            }).catch(() => {
            alert("Coundn't log in! :(")
        })
    }

    onGoogleLoginClicked() {
        //console.warn("Google log in happened!")
        this.authService.googleAuth().then(() => {
            this.router.navigate(['/']);
        }).catch(() => {
            alert("Coundn't log in with Google :(")
        })
    }

    onGoogleRegisterClicked() {

    }
}
