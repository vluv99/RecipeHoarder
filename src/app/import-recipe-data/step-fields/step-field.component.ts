import {Component, Input, OnInit} from '@angular/core';
import {Steps} from "../../../../shared/model/Steps";

@Component({
  selector: 'app-step-fields',
  templateUrl: './step-field.component.html',
  styleUrls: ['./step-field.component.scss']
})
export class StepFieldComponent implements OnInit {

  @Input() step!:Steps;

  constructor() { }

  ngOnInit(): void {
  }

}
