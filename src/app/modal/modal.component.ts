import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() countSuccess : number = 0;
  @Input() countError : number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
