import { Component, OnInit } from '@angular/core';
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-report-recipe-list',
  templateUrl: './report-recipe-list.component.html',
  styleUrls: ['./report-recipe-list.component.scss']
})
export class ReportRecipeListComponent implements OnInit {

  constructor(private _bottomSheetRef: MatBottomSheetRef<ReportRecipeListComponent>) { }

  ngOnInit(): void {
  }

    openLink($event: MouseEvent) {
        this._bottomSheetRef.dismiss();
        event!.preventDefault();
    }
}
