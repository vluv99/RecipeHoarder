import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core";

@Component({
  selector: 'app-recipe-step',
  templateUrl: './recipe-step.component.html',
  styleUrls: ['./recipe-step.component.scss']
})
export class RecipeStepComponent implements OnInit {
  @Input() step!: String;
  @Input() num!: Number;

  constructor() { }

  ngOnInit(): void {
  }

}
