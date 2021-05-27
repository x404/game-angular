import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class DataService{
    objOfCells: any = {};
    cellcounts  : number = 100;

    generateData() : void{
        if (this.cellcounts > 0) {
            for (let i = 1; i <= this.cellcounts; i++) {
             this.createObj(i);
            }
        }
    }

    createObj(id: number) : void {
        const obj: { id: number; success: boolean; error: boolean} = {
          id: id,
          success: false,
          error:  false    
        };
    
        this.objOfCells[id] = obj;
    }

    updateData(id:number, key:string, value : boolean){
        this.objOfCells[id][key] = value;
    }
}