import { Component } from '@angular/core';
//import {ActivatedRoute, Router, RouterEvent, RouterStateSnapshot} from "@angular/router";
import {filter} from "rxjs/operators";
import {Event, RouterEvent, Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'recipe-hoarder';
  url: String | undefined;

  constructor(public router: Router) {
    router.events.pipe(
      filter((e: Event): e is RouterEvent => e instanceof RouterEvent)
    ).subscribe((e: RouterEvent) => {
      //get router url for header change
      this.url = e.url

      //console.log(this.url)
    });
  }

}


