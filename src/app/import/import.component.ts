import { Component, OnInit } from '@angular/core';
import {Event, RouterEvent, Router} from '@angular/router';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {

  value = '';

  constructor() { }

  ngOnInit(): void {
  }

}
