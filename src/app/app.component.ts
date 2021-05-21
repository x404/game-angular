import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  objOfCells:any = {};
  // clickCellFlag:boolean = false;
  // start:boolean = false;
  // errorDelayValue:boolean = false;
  // fragment:any = document.createDocumentFragment();
  // timer:any;
  // prevId:any;

  cellcounts: number = 100;
  finishcount: number = 10;
  // timeoutEl: any = document.querySelector(".i-delay");
  // gameDiv: any = document.querySelector(".list");
  // userCountEl: any = document.querySelector("#user_count");
  // computerCountEl:any = document.querySelector("#computer_count");
  // countSuccess:number = 0;
  // countError:number = 0;

  constructor() {
    this.init()
  }


  init() {
    if (this.cellcounts > 0) {
      for (let i = 1; i <= this.cellcounts; i++) {
       this.createObj(i);  
       // this.renderGrid(i);
      }
    // this.gameDiv.appendChild(this.#fragment);
    // this.eventsListeners();
    }
  }

  createObj(id: number) {
    let obj:any = {};
    obj.id = id;
    obj.success = false;
    obj.error = false;

    this.objOfCells[id] = {obj};
  }


}
