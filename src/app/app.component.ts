import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  objOfCells:any = {};
  clickCellFlag:boolean = false;
  start:boolean = false;
  errorDelayValue:boolean = false;
  
  timer:any;

  currentId: number = -1;
  prevId:number = -1; //?

  cellcounts: number = 100;
  finishcount: number = 10;
  delayValue: number = 10;
  
  gameDiv = <HTMLElement>document.querySelector(".list");
  
  countSuccess:number = 0;
  countError:number = 0;

  isShowModal: boolean = false;

  constructor() {
    this.init()
  }


  init() {
    if (this.cellcounts > 0) {
      for (let i = 1; i <= this.cellcounts; i++) {
       this.createObj(i);
      }
    }
    //console.log(this.objOfCells)
  }


  /**
   * Method for create object
   */
  createObj(id: number) {
    /*interface cellObj {
      id: number;
      success: boolean;
      error : boolean
    }
    */

    const obj: { id: number; success: boolean; error: boolean} = {
      id: id,
      success: false,
      error:  false    
    };

    this.objOfCells[id] = obj;
  }

  // start game
  startGame() : void {
    if (this.delayValue > 0) {
      if (this.start) this.reset();
      if (this.errorDelayValue && document.querySelectorAll(".error").length > 0) {
       // document.querySelector(".error").remove();
      }
      // starting position
      const arr:any = Object.entries(this.objOfCells);
      const rnd:number = this.randomInteger(arr.length - 1);
      const idx:number = arr[rnd][1].id;

      // set active cell
      this.currentId = idx;

      // start timer
      this.prevId = idx;
      
      this.timer = setInterval(this.blinkCell.bind(this), this.delayValue);
      this.start = true;
      this.errorDelayValue = false;
    } else if (!this.errorDelayValue) {
      this.gameDiv.insertAdjacentHTML(
        "beforeend",
        '<p class="error">Введите число больше нуля!</p>'
      );
      this.errorDelayValue = true;
    }
  }

  onCloseModal(data: any ){
    this.isShowModal = data.isShowModal;
    this.reset()
  }

  // check data (success and error cells) in Object
  checkResult() {
    //console.log('check result')
    this.countSuccess = Object.entries(this.objOfCells).filter(
      (el: any) => el[1].success == true
    ).length;
    this.countError = Object.entries(this.objOfCells).filter((el: any) => el[1].error == true).length;

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
  randomInteger(max:number) {
    let rand = Math.floor(Math.random() * (max + 1));
    return rand;
  }

  // blink cell
  blinkCell() {
        //  if cell was active and no pressed it
        if (!this.clickCellFlag) {
          //console.log('error');
          this.updateStatusCellInObj(this.prevId, "error");
        }
    
        const arr: any = Object.entries(this.objOfCells).filter(
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
  updateCell(id : any) {
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
    //console.log(id, key);
    this.objOfCells[id][key] = true;
  }

  reset(): void{
    for (let key in this.objOfCells) {
      this.objOfCells[key].success = false;
      this.objOfCells[key].error = false;
    }

    this.currentId = this.prevId = -1;
    this.countSuccess = this.countError = 0;
    this.start = false;
  }
}
