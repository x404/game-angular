import { Component } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  clickCellFlag:   boolean = false;
  start:           boolean = false;
  errorDelayValue: boolean = false;
  
  timer: any;

  currentId: number = -1;
  prevId:    number = -1;

  finishcount : number = 10;
  delayValue  : number = 1200;
  countSuccess: number = 0;
  countError  : number = 0;  
  
  gameDiv = <HTMLElement>document.querySelector(".list");

  isShowModal: boolean = false;

  constructor(public appDataService: DataService) {
    this.init();
  }

  init() {
    this.appDataService.generateData()
  }

  // start game
  startGame() : void {
    if (this.delayValue > 0) {
      if (this.start) this.reset();

      // starting position
      const arr: any[] = Object.entries(this.appDataService.objOfCells);
      const rnd: number = this.randomInteger(arr.length - 1);
      const idx: number = arr[rnd][1].id;

      // set active cell
      this.currentId = idx;

      // start timer
      this.prevId = idx;
      
      this.timer = setInterval(this.blinkCell.bind(this), this.delayValue);
      this.start = true;
      this.errorDelayValue = false;
    } else {
      this.errorDelayValue = true;
    }
  }

  onCloseModal(data: any ): void{
    this.isShowModal = data.isShowModal;
    this.reset()
  }

  // check data (success and error cells) in Object
  checkResult(): boolean {
    this.countSuccess = Object.entries(this.appDataService.objOfCells).filter(
      (el: any) => el[1].success == true
    ).length;
    this.countError = Object.entries(this.appDataService.objOfCells).filter((el: any) => el[1].error == true).length;

    if (this.countSuccess >= this.finishcount || this.countError >= this.finishcount) {
      console.log("%c- STOP GAME -", "color: red;font-weight:bold");
      //console.log('.. here show Modal');
      this.isShowModal = true;
      clearInterval(this.timer);
      return false;
    }
     return true;
  }

  // random number
  randomInteger(max: number): number {
    let rand = Math.floor(Math.random() * (max + 1));
    return rand;
  }

  // blink cell
  blinkCell(): void {
    //  if cell was active and no pressed it
    if (!this.clickCellFlag) {
      this.updateStatusCellInObj(this.prevId, "error");
    }

    const arr: any = Object.entries(this.appDataService.objOfCells).filter(
      (el: any) => el[1].error == false && el[1].success == false
    );

    if (arr.length === 0 || !this.checkResult()) {
      clearInterval(this.timer);
      return;
    }

    // select random element from array
    const rnd: number = this.randomInteger(arr.length - 1);
    const id: number = arr[rnd][1].id;

    this.prevId = id;
    if (this.countError < this.finishcount && this.countSuccess < this.finishcount) {
      // set active next cell in html
      this.currentId = id;
    }
    this.clickCellFlag = false;
  }


  // update Status Cell in Grid and update status in Object
  updateCell(id : any): void {
    this.clickCellFlag = true;
    this.updateStatusCellInObj(+id, "success");       
    if (this.checkResult()) {
      clearInterval(this.timer);
      this.blinkCell();
      this.timer = setInterval(this.blinkCell.bind(this), this.delayValue);
    }
  }

  // update status Cell in Object
  updateStatusCellInObj(id:number, key:string): void {
    this.appDataService.updateData(id, key, true)
  }

  reset(): void{
    for (let id in this.appDataService.objOfCells) {
      this.appDataService.updateData(+id, 'success', false)
      this.appDataService.updateData(+id, 'error', false)
    }

    this.currentId = this.prevId = -1;
    this.countSuccess = this.countError = 0;
    this.start = false;
  }
}