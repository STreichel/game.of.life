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
  playerTurn= this.player1;

  cell= null || 'X' || 'O';

  createBoard = (): Array<Array<string>> => [['', '', ''], ['', '', ''], ['', '', '']]
  
  constructor() { 
    this.board = this.createBoard();
    for (let i = 0; i < this.board.length; ++i) {
      for (let j = 0; j < this.board[i].length; ++j) {
        this.board[i][j] ='';
      }
    }
  }
 
  StartNewGame(){
    this.board = this.createBoard();
    for (let i = 0; i < this.board.length; ++i) {
      for (let j = 0; j < this.board[i].length; ++j) {
        this.board[i][j] = '';
      }
    }
  }

  takeTurn(i:number, j:number){
    this.board[i][j] = '';
      this.board[i][j] = this.playerTurn;
        if(this.playerTurn==this.player1){
          this.playerTurn=this.player2;
        }
          else{
            this.playerTurn=this.player1;
          }
  }

  ngOnInit(): void {
  }
}

