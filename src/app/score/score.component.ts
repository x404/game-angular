import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  @Input() countSuccess : number = 0;
  @Input() countError : number = 0;

  constructor() {}

  ngOnInit(): void {}

}
