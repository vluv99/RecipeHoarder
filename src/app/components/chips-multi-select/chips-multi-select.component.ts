import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatChip, MatChipList} from "@angular/material/chips";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {map} from "rxjs";
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-chips-multi-select',
  templateUrl: './chips-multi-select.component.html',
  styleUrls: ['./chips-multi-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ChipsMultiSelectComponent,
      multi: true,
    },
  ],
})
export class ChipsMultiSelectComponent implements OnInit, ControlValueAccessor, AfterViewInit {
  @Input()
  options: string[] = ["Breakfast", "Main course", "Dessert", "Snack", "Quick", "Healthy", "Complex", "Spicy"];

  @ViewChild(MatChipList)
  chipList!: MatChipList;

  chosen: string[] = []

  //###  ControlValueAccessor ####
  onChange = (value: string[]) => {};

  constructor() { }

  ngOnInit(): void {
  }

  toggleSelection(chip: MatChip) {
    chip.toggleSelected();

  }

  ngAfterViewInit() {
    this.selectChips(this.chosen);

    this.chipList.chipSelectionChanges
      .pipe(
        untilDestroyed(this),
        map((event) => event.source))
      .subscribe((chip) => {
        if (chip.selected) {
          this.chosen = [...this.chosen, chip.value];
        } else {
          this.chosen = this.chosen.filter((o) => o !== chip.value);
        }

        this.onChange(this.chosen);
      });
  }


  //###  ControlValueAccessor ####
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(value: string[]): void {
    // When form value set when chips list initialized
    if (this.chipList && value) {
      this.selectChips(value);
    } else if (value) {
      // When chips not initialized
      this.chosen = value;
    }
  }

  selectChips(value: string[]) {
    this.chipList.chips.forEach((chip) => chip.deselect());

    const chipsToSelect = this.chipList.chips.filter((c) =>
      value.includes(c.value)
    );

    chipsToSelect.forEach((chip) => chip.select());
  }
}
