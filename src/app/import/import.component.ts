import {Component, OnInit} from '@angular/core';
import {Event, RouterEvent, Router} from '@angular/router';
//import {AngularFirestore} from "@angular/fire/firestore";
import {RecipeImporterService} from "../services/recipe-importer.service";
import {DatabaseService} from "../services/database-service";

@Component({
    selector: 'app-import',
    templateUrl: './import.component.html',
    styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {

    value = '';
    inProgress: boolean = false;

    constructor(private importer: RecipeImporterService, private _router: Router) {
    }

    ngOnInit(): void {
    }

    importRecipe() {
        this.inProgress = true
        this.importer.getRecipe(this.value).then((r => {
            this._router.navigate(['/recipe-data'])
        })).catch(() => {
            this.inProgress = false;
        })
    }

}
