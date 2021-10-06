import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressBarMode} from '@angular/material/progress-bar';


@Component({
  selector: 'app-config-progress-bar',
  templateUrl: './config-progress-bar.component.html',
  styleUrls: ['./config-progress-bar.component.css']
})
export class ConfigProgressBarComponent implements OnInit {
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value = 100;
  constructor() { }

  ngOnInit(): void {
  }

}
