import { Component, Input, OnInit, Output , EventEmitter} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
 
  @Output() onClose = new EventEmitter;
  data:{} = {start : false, isShowModal : false}
  closeModal(){
    this.onClose.emit(this.data);
  }

  @Input() isShowModal : boolean = false;
  @Input() countSuccess : number = 0;
  @Input() countError : number = 0;

  constructor() { 
    console.log('modal')
  }

  ngOnInit(): void {

  }

}
