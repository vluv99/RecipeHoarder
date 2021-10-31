import {Component, ViewChild} from '@angular/core';
//import {ActivatedRoute, Router, RouterEvent, RouterStateSnapshot} from "@angular/router";
import {filter} from "rxjs/operators";
import {Event, RouterEvent, Router} from '@angular/router';
import {AuthService} from "./services/auth-service";
import {MatSidenav} from "@angular/material/sidenav";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'recipe-hoarder';
    url: String | undefined;

    @ViewChild(MatSidenav)
    sidenav!:MatSidenav

    constructor(public router: Router, public authService: AuthService) {
        router.events.pipe(
            filter((e: Event): e is RouterEvent => e instanceof RouterEvent)
        ).subscribe((e: RouterEvent) => {
            //get router url for header change
            this.url = e.url

            this.sidenav.close();
            //console.log(this.url)
        });
    }

}


