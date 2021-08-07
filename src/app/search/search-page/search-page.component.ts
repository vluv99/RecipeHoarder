import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Recipe} from "../../../model/Recipe";
import {DatabaseServiceService} from "../../services/database-service.service";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit, OnDestroy  {

  recipes!: Recipe[];
  searchTerm!: string;
  private sub: any;

  constructor(private route: ActivatedRoute, private db:DatabaseServiceService) {
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.searchTerm = params['searchTerm'];

      this.recipes = this.db.search(this.searchTerm)
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
