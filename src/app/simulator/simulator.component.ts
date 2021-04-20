import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css']
})
export class SimulatorComponent implements OnInit {
  
  numRows: number = 100;
  numCols: number = 100;
  grid: boolean[][];

  constructor() {
    this.grid = new Array<boolean[]>(this.numRows);
    for (var i=0; i < this.grid.length; i++) {
      this.grid[i] = new Array<boolean>(this.numCols);
      for (var j=0; j < this.grid[i].length; j++) {
        this.grid[i][j] = Math.random() < 0.2;
      }
    }
  }
  
  runOneStep(){
    let newGrid = new Array<boolean[]>(this.numRows);
    for (var i=0; i < this.grid.length; i++) {
      newGrid[i] = new Array<boolean>(this.numCols);
      for (var j=0; j < this.grid[i].length; j++) {
        newGrid[i][j] = !this.grid[i][j];
      }
    }
    this.grid = newGrid;
  }

  ngOnInit(): void {
  }

  toggleCell(i: number, j: number): void {
    this.grid[i][j] = !this.grid[i][j]
  }

}
