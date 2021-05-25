import { Component, Input, OnInit, Output, EventEmitter, OnChanges} from '@angular/core';
 
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnChanges{
 
  @Output() onClose = new EventEmitter;
  data:{} = {start : false, isShowModal : false}
  closeModal(){
    this.onClose.emit(this.data);
  }

  @Input() isShowModal : boolean = false;
  @Input() countSuccess : number = 0;
  @Input() countError : number = 0;

  constructor() { 
  }

  ngOnInit() {
  }

  ngOnChanges() {  
   if (this.isShowModal){
     document.body.classList.add("modal-open");
    } else {
     document.body.classList.remove("modal-open");
    }
  }
}
