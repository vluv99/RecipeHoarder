import {Component, Input, OnInit} from '@angular/core';
import {MatChip} from "@angular/material/chips";

@Component({
  selector: 'app-chips-multi-select',
  templateUrl: './chips-multi-select.component.html',
  styleUrls: ['./chips-multi-select.component.scss']
})
export class ChipsMultiSelectComponent implements OnInit {
  @Input() options: string[] = ["Lunch", "Dinner", "Dessert", "Breakfast", "Snack", "Quick", "Healthy", "Complex"];
  //"Lunch", "Dinner", "Dessert", "Breakfast", "Snack", "Quick", "Healthy", "Complex"

  chosen: string[] = []
  constructor() { }

  ngOnInit(): void {
  }

  toggleSelection(chip: MatChip) {
    if(chip.selected){
      this.chosen.push("asd")
    }
    chip.toggleSelected();
  }
}
