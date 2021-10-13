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
    chip.toggleSelected();

    if(chip.selected){
      this.chosen.push(chip.value)
    }

    if(!chip.selected){
      const index = this.chosen.indexOf(chip.value, 0);
      if (index > -1) {
        this.chosen.splice(index, 1);
      }
    }

  }
}
