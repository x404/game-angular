import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  objOfCells:any = {};
  // clickCellFlag:boolean = false;
  start:boolean = false;
  errorDelayValue:boolean = false;
  // fragment:any = document.createDocumentFragment();
  timer:any;
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
  }


  /**
   * Method for create object
   */
  createObj(id: number) {
    let obj:any = {};
    obj.id = id;
    obj.success = false;
    obj.error = false;
    this.objOfCells[id] = {obj};
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
      const rnd = this.randomInteger(arr.length - 1);
      const id = arr[rnd][1].id;

      //document.querySelector(".btn-start").classList.add("d-none");
      // set active cell
     // document.querySelector(`[data-id="${id}"]`).classList.add("cell-active");

      // start timer
      this.prevId = id;
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
    console.log('blinkCell')
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

    this.updateCountElements(this.countSuccess, this.countError);
  }
}
