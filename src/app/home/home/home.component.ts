import { Component, OnInit } from '@angular/core';
import {DatabaseService} from "../../services/database-service";
import {Recipe} from "../../../../shared/model/Recipe";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recommendedRecpes?:Recipe[];
  recommendedRecpes2?:Recipe[];

  constructor(private db:DatabaseService) {}

  ngOnInit(): void {
    this.db.getRecommendedRecipes().then((r) => {
      this.recommendedRecpes = r;
      this.recommendedRecpes2 = this.recommendedRecpes.reverse()
    })

  }

}
