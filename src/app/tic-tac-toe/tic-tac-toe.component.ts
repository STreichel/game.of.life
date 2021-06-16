import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css']
})

export class TicTacToeComponent implements OnInit {
  
  board: Array<Array<string>>;

  player1='X';
  player2='O';
  playerTurn= this.player1 || this.player2;

  createBoard = (): Array<Array<string>> => [['', '', ''], ['', '', ''], ['', '', '']]
  
  constructor() { 
    this.board = this.createBoard();
    for (let i = 0; i < this.board.length; ++i) {
      for (let j = 0; j < this.board[i].length; ++j) {
        let r = Math.floor(Math.random() * 3);
        if (r == 1) {
          this.board[i][j] = 'X';
        } else if (r == 2) {
          this.board[i][j] = 'O';
        }
      }
    }
  }
 
  cell(){

  }

  NewGame(){
    this.board = this.createBoard();
    for (let i = 0; i < this.board.length; ++i) {
      for (let j = 0; j < this.board[i].length; ++j) {
        this.board[i][j] = '';
      }
    }
  }

  takeTurn(){
    this.board = this.createBoard();
    for (let i = 0; i < this.board.length; ++i) {
      for (let j = 0; j < this.board[i].length; ++j) {
        if (this.cell === null){
          this.board[i][j] = this.playerTurn;
        }
      }
    }
  }

  ngOnInit(): void {
  }
}

