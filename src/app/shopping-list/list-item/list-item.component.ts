import {Component, Input, OnInit} from '@angular/core';
import {Ingredient} from "../../../../shared/model/Ingredient";

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  @Input() ingredient! : Ingredient;

  constructor() { }

  ngOnInit(): void {
  }

}
