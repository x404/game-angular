import { Component, Input, OnInit, Output, EventEmitter, OnChanges, HostListener} from '@angular/core';
 
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnChanges{

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.key === "Escape") {
        this.closeModal()
    }
}

  @Output() onClose = new EventEmitter;
  data:{} = {isShowModal : false}
  closeModal(): void{
    this.onClose.emit(this.data);
  }

  @Input() isShowModal  : boolean = false;
  @Input() countSuccess : number  = 0;
  @Input() countError   : number  = 0;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges() {  
   if (this.isShowModal){
     document.body.classList.add("modal-open");
    } else {
     document.body.classList.remove("modal-open");
    }
  }
}
