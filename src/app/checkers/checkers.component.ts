import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkers',
  templateUrl: './checkers.component.html',
  styleUrls: ['./checkers.component.css']
})
export class CheckersComponent implements OnInit {

  numRows: number = 8;
  numCols: number = 8;

  board: boolean[][];

  constructor() {
    this.board = new Array<boolean[]>(this.numRows);
    for (var i=0; i < this.board.length; i++) {
      this.board[i] = new Array<boolean>(this.numCols);
      for (var j=0; j < this.board[i].length; j++) {
        this.board[i][j] = this.board[i][j];
      }
    }
  }

  ngOnInit(): void {
  }

}
