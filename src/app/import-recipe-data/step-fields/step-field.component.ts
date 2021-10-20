import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Steps} from "../../../../shared/model/Steps";
import {ControlValueAccessor} from "@angular/forms";
import {Ingredient} from "../../../../shared/model/Ingredient";

@Component({
  selector: 'app-step-fields',
  templateUrl: './step-field.component.html',
  styleUrls: ['./step-field.component.scss']
})
export class StepFieldComponent implements OnInit, ControlValueAccessor {

  @Input() step!:Steps;
  @Output() remove = new EventEmitter<Steps>();

  onChange = (step:Steps) => {};

  constructor() { }

  ngOnInit(): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
  }

}
