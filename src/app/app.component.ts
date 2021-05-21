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
  // fragment:any = document.createDocumentFragment();
  timer:any;

  currentId: number = 1;
  prevId:number = -1; //?

  cellcounts: number = 100;
  finishcount: number = 10;
  delayValue: number = 1000;
  // timeoutEl: any = document.querySelector(".i-delay");
  gameDiv: any = document.querySelector(".list");
  // userCountEl: any = document.querySelector("#user_count");
  // computerCountEl:any = document.querySelector("#computer_count");
  countSuccess:number = 0;
  countError:number = 0;

  constructor() {
    this.init()
  }


  init() {
    if (this.cellcounts > 0) {
      for (let i = 1; i <= this.cellcounts; i++) {
       this.createObj(i);
      }
    // this.gameDiv.appendChild(this.#fragment);
    // this.eventsListeners();
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

    const obj:any = {
      id: id,
      success: false,
      error:  false    
    };

    this.objOfCells[id] = obj;
  }

  // start game
  startGame() {
    if (this.delayValue > 0) {
      if (this.start) this.reset();
      if (this.errorDelayValue && document.querySelectorAll(".error").length > 0) {
       // document.querySelector(".error").remove();
      }
      // starting position
      const arr:any = Object.entries(this.objOfCells);
      const rnd:number = this.randomInteger(arr.length - 1);
      const idx:number = arr[rnd][1].id;
      

      //document.querySelector(".btn-start").classList.add("d-none");

      // set active cell
      this.currentId = idx;
     // document.querySelector(`[data-id="${id}"]`).classList.add("cell-active");


     console.log(arr[rnd][1]);
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

  // check data (success and error cells) in Object
  checkResult() {
    // this.countSuccess = Object.entries(this.objOfCells).filter(
    //   (el) => el[1].success == true
    // ).length;
    // this.countError = Object.entries(this.objOfCells).filter((el) => el[1].error == true).length;

    // this.updateCountElements(this.countSuccess, this.countError);

    // if (this.countSuccess == this.finishcount || this.countError == this.finishcount) {
    //   console.log("%c- STOP GAME -", "color: red;font-weight:bold");
    //   // console.log(this.#objOfCells);

    //   console.log('.. here show Modal');
    //   //const newModal = new Modal(this.countSuccess, this.countError);
    //   //newModal.show();

    //   clearInterval(this.timer);
    //   return false;
    // }
     return true;
  }

  // update num of Count Elements in HTML
  updateCountElements(countSuccess:number, countError: number) {
    console.log('updateCountElements');
  //    this.userCountEl.textContent = countSuccess;
  //    this.computerCountEl.textContent = countError;
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
          //document.querySelector(".cell-active").classList.add("cell-error");
          //document.querySelector(".cell-active").classList.remove("cell-active");
          this.updateStatusCellInObj(this.prevId, "error");
        }
    
        const arr: any = Object.entries(this.objOfCells).filter(
          (el
            :any) => el[1].error == false && el[1].success == false
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
          //document.querySelector(`[data-id="${id}"]`).classList.add("cell-active");
        }
    
        this.clickCellFlag = false;
  }


    // update Status Cell in Grid and update status in Object
    updateCell() {
      // const target = e.target;
      // if (target.classList.contains("cell-active")) {
      //   const id = target.dataset.id;
      //   this.clickCellFlag = true;
      //   this.updateStatusCellInObj(id, "success");
  
      //   if (this.checkResult()) {
      //     clearInterval(this.timer);
      //     this.blinkCell();
      //     this.timer = setInterval(this.blinkCell.bind(this), this.timeout);
      //   }
  
      //   target.classList.remove("cell-active");
      //   target.classList.add("cell-success");
      // }
    }

    // update status Cell in Object
  updateStatusCellInObj(id:number, key:string) {
    console.log(id, key);
    this.objOfCells[id][key] = true;
  }

  reset(){
    for (let key in this.objOfCells) {
      this.objOfCells[key].success = false;
      this.objOfCells[key].error = false;
    }

    if (document.querySelectorAll(".cell-error").length > 0) {
      document.querySelectorAll(".cell-error").forEach((el) => {
        el.classList.remove("cell-error");
      });
    }

    if (document.querySelectorAll(".cell-success").length > 0) {
      document.querySelectorAll(".cell-success").forEach((el) => {
        el.classList.remove("cell-success");
      });
    }
    //this.prevId = null;
    this.prevId = -1;
    this.countSuccess = 0;
    this.countError = 0;

    //this.updateCountElements(this.countSuccess, this.countError);
  }
}
