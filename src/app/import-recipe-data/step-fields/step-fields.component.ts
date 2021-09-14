import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-step-fields',
  templateUrl: './step-fields.component.html',
  styleUrls: ['./step-fields.component.scss']
})
export class StepFieldsComponent implements OnInit {
  num?: number;
  text?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
