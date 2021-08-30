import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  open: boolean = false;
  @ViewChild('input') input!:ElementRef;

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  searchButton(): void{
    if (this.open){
      this._router.navigate(['search/', this.input.nativeElement.value])
      this.open = false;

    }else {
      this.open = true;
      this.input.nativeElement.focus();
      this.input.nativeElement.value = "";
    }
  }

}
